from rest_framework.serializers import ModelSerializer
from .models import *
from api.users.serializers import UserSerializerWithToken, UsernameSerializer
from rest_framework import serializers



class MessageSerializer(serializers.ModelSerializer):
    sender = UsernameSerializer()
    receiver = UsernameSerializer()
    # receiver = UserSerializerWithToken()
    class Meta:
        model = Message
        fields = ['id', 'sender', 'receiver', 'message', 'sent_at', 'isRead']


