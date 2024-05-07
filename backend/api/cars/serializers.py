from rest_framework.serializers import ModelSerializer
from .models import *
from api.users.serializers import UserSerializerWithToken, UsernameSerializer
from rest_framework import serializers
from api.categories.serializers import CategorySerializer



class CarSerializer(serializers.ModelSerializer):
    # user = serializers.StringRelatedField(source='user.username')  # Use StringRelatedField to return the username
    # user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), many=False)
    # user = UserSerializerWithToken()
    user = UsernameSerializer(many=False)
    category = CategorySerializer()
    class Meta:
        model = Car
        fields = '__all__'
