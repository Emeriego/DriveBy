from rest_framework.serializers import ModelSerializer
from .models import *
from api.users.serializers import UserSerializerWithToken
from rest_framework import serializers
from api.cars.serializers import CarSerializer

class BookingSerializer(serializers.ModelSerializer):
    user = UserSerializerWithToken()
    car = CarSerializer()
    class Meta:
        model = Booking
        fields = '__all__'


