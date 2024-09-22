from rest_framework.serializers import ModelSerializer
from .models import *
from api.users.serializers import UserSerializerWithToken
from api.cars.serializers import CarSerializer
from rest_framework import serializers


class UserReviewSerializer(serializers.ModelSerializer):
    user = UserSerializerWithToken()
    class Meta:
        model = UserReview
        fields = '__all__'

class CarReviewSerializer(serializers.ModelSerializer):
    reviewer = UserSerializerWithToken()
    car = CarSerializer()
    class Meta:
        model = CarReview
        fields = '__all__'

