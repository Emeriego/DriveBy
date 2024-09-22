from rest_framework.serializers import ModelSerializer
from api.models import *
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken

class UsernameSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username']
        
class UserSerializerWithToken(serializers.ModelSerializer):
    token = serializers.SerializerMethodField()
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'token']

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)

class RegisterUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class LogoutSerializer(serializers.ModelSerializer):
    pass

