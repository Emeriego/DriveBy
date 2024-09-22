from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from .serializers import *
from api.models import User
from api.cars.models import Car
from .models import *
from rest_framework import status

from rest_framework.permissions import IsAuthenticated

@api_view(['GET'])
def getAllBookings(request):
    bookings = Booking.objects.all()
    serializer = BookingSerializer(bookings, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserBookings(request):
    user = request.user
    bookings = user.booking_set.all()
    serializer = BookingSerializer(bookings, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getCarBookings(request, pk):
    car = Car.objects.get(id=pk)
    bookings = car.booking_set.all()
    serializer = BookingSerializer(bookings, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getBookingById(request, pk):
    booking = Booking.objects.get(id=pk)
    serializer = BookingSerializer(booking, many=False)
    return Response(serializer.data)

@api_view(['POST'])
# @permission_classes([IsAuthenticated])
def confirmBooking(request, pk):
    booking = Booking.objects.get(id=pk)
    booking.status = "Confirmed"
    booking.save()
    serializer = BookingSerializer(booking, many=False)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def rejectBooking(request, pk):
    booking = Booking.objects.get(id=pk)
    booking.status = "Rejected"
    booking.save()
    serializer = BookingSerializer(booking, many=False)
    return Response(serializer.data)

@api_view(['POST'])
# @permission_classes([IsAuthenticated])
def completeBooking(request, pk):
    booking = Booking.objects.get(id=pk)
    booking.status = "Completed"
    booking.save()
    serializer = BookingSerializer(booking, many=False)
    return Response(serializer.data)


@api_view(['POST'])
# @permission_classes([IsAuthenticated])
def cancelBooking(request, pk):
    booking = Booking.objects.get(id=pk)
    booking.status = "Canceled"
    booking.save()
    serializer = BookingSerializer(booking, many=False)
    return Response(serializer.data)
