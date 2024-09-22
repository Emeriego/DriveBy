from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from .serializers import *
from api.models import User
from .models import *
from rest_framework import status

from rest_framework.permissions import IsAuthenticated

# urlpatterns = [
#     path('user/',    getUserReviews, name='user_reviews'),
#     path('car/',    getCarReviews, name='car_reviews'),
#     path('user/create/', createUserReview, name='create_user_review'),
#     path('car/create/', createCarReview, name='create_car_review'),
 
# ]
@api_view(['GET'])
def getCarReviews(request, pk):
    reviews = CarReview.objects.filter(car=pk)
    serializer = CarReviewSerializer(reviews, many=True)
    return Response(serializer.data)
  
@api_view(['GET'])
def getUserReviews(request, pk):
    reviews = UserReview.objects.filter(user=pk)
    serializer = UserReviewSerializer(reviews, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createUserReview(request):
    user = request.user
    data = request.data
    review = UserReview.objects.create(
        reviewer=user,
        user=User.objects.get(id=data['user']),
        rating=data['rating'],
        review=data['review']
    )
    serializer = UserReviewSerializer(review, many=False)
    return Response(serializer.data)

# @api_view(['POST'])
# # @permission_classes([IsAuthenticated])
# def createCarReview(request):
#     user = request.user
#     data = request.data
#     print(data)
#     review = CarReview.objects.create(
#         reviewer=user,
#         car=Car.objects.get(id=data['car']),
#         rating=data['rating'],
#         review=data['review']
#     )
#     serializer = CarReviewSerializer(review, many=False)
#     return Response(serializer.data)

@api_view(['POST'])
def createCarReview2(request):
    user = request.user
    data = request.data
    print(data)
    review = CarReview.objects.create(
        reviewer=user,
        car=Car.objects.get(id=data['car']),
        rating=data['rating'],
        review=data['review']
    )
    serializer = CarReviewSerializer(review, many=False)
    return Response(serializer.data)

@api_view(['GET'])
def getAllUsers(request):
    users = User.objects.all()
    serializer = UserSerializerWithToken(users, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getAllCars(request):
    cars = Car.objects.all()
    serializer = CarSerializer(cars, many=True)
    return Response(serializer.data)
