from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from .serializers import *
from api.models import User
from api.categories.models import Category
from api.bookings.models import Booking
from api.reviews.models import CarReview
from api.reviews.serializers import *
from api.bookings.serializers import BookingSerializer
from .models import *
from rest_framework import status
from django.http import Http404
from django.shortcuts import get_object_or_404

from rest_framework.permissions import IsAuthenticated


@api_view(['GET'])
def getCars(request):
    cars = Car.objects.all()
    serializer = CarSerializer(cars, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getCar(request, pk):
    try:
        car = get_object_or_404(Car, id=pk)
        serializer = CarSerializer(car, many=False)
        return Response(serializer.data)
    except Http404:
        return Response({"error": "Car not found"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createCar(request):
    """Create car and handle image upload as well"""
    user = request.user
    data = request.data

    image_file = request.FILES.get('image')

    car = Car.objects.create(
        user=user,
        brand=data['brand'],
        model=data['model'],
        color=data['color'],
        price=data['price'],
        category=Category.objects.get(name=data['category']),
        location=data['location'],
        city=data['city'],
        power=data['power'],
        condition=data['condition'],
    )

    if image_file:
        car.img = image_file
        car.save()

    serializer = CarSerializer(car, many=False)
    return Response(serializer.data)




# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def createCar(request):
#     """create car and handle image upload as well"""
#     user = request.user
#     data = request.data
#     car = Car.objects.create(
#         user=user,
#         brand = data['brand'],
#         model = data['model'],
#         color = data['color'],
#         img = 'default.jpeg',
#         price = data['price'],
#         category = Category.objects.get(name=data['category']),
#         location = data['location'],
#         city = data['city'],
#         power = data['power'],
#         condition = data['condition'],
#     )
#     serializer = CarSerializer(car, many=False)
#     return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def uploadImage(request):
    data = request.data

    car_id = data['car_id']
    car = Car.objects.get(id=car_id)

    car.img = request.FILES.get('image')
    car.save()

    return Response('Image was uploaded')



@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateCar(request, pk):
    data = request.data
    car = Car.objects.get(id=pk)

    car.name = data['name']
    car.price = data['price']
    car.brand = data['brand']
    car.countInStock = data['countInStock']
    car.category = Category.objects.get(_id=data['category'])
    car.description = data['description']

    car.save()

    serializer = CarSerializer(car, many=False)
    return Response(serializer.data)



@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteCar(request, pk):
    car = Car.objects.get(id=pk)
    car.delete()
    return Response('Car Deleted')

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyCars(request):
    user = request.user
    # cars = Car.objects.filter(user=user)
    cars = user.car_set.all()
    serializer = CarSerializer(cars, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createBooking(request, pk):
    user = request.user
    car = Car.objects.get(id=pk)
    data = request.data

    # Convert formatted date strings to datetime objects
    start_date_str = data['startDate']
    end_date_str = data['endDate']
    start_date = datetime.strptime(start_date_str, '%d %m %Y %H:%M')  # Adjust format based on frontend
    end_date = datetime.strptime(end_date_str, '%d %m %Y %H:%M')  # Adjust format based on frontend

    booking = Booking.objects.create(
        user=user,
        car=car,
        start_date=start_date.strftime('%Y-%m-%d %H:%M'),  # Convert datetime objects back to string format
        end_date=end_date.strftime('%Y-%m-%d %H:%M'),  # Convert datetime objects back to string format
        total_hours=data['totalHours'],
        total_price=data['totalPrice'],
        status=data['status']
    )
    serializer = BookingSerializer(booking, many=False)
    return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createCarReview(request):
    user = request.user
    data = request.data
    car = Car.objects.get(id=data['car'])

    # Check if the user has already reviewed the car
    already_reviewed = car.carreview_set.filter(reviewer=user).exists()
    if already_reviewed:
        return Response({'detail': 'Product already reviewed'}, status=status.HTTP_400_BAD_REQUEST)

    # Create review
    review = CarReview.objects.create(
        reviewer=user,
        car=car,
        rating=data['rating'],
        review=data['review']
    )

    # Get all reviews for the car
    reviews = car.carreview_set.all()
    car.numReviews = len(reviews)

    # Calculate the rating
    total = 0
    for i in reviews:
        total += i.rating

    car.rating = total / len(reviews)
    car.save()

    return Response('Review Added')
