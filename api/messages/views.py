from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from .serializers import *
from api.models import User
from api.messages.models import Message
from rest_framework.permissions import IsAuthenticated



@api_view(['POST'])
# @permission_classes([IsAuthenticated])
def createMessage(request):
    user = request.user
    data = request.data
    print(data)
    reciever = User.objects.get(username=data['username'])
    message = Message.objects.create(
        sender=user,
        receiver=reciever,
        message=data['message'],
    )
    serializer = MessageSerializer(message, many=False)
    return Response(serializer.data)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def allMessages(request):
    user = request.user
    messages = Message.objects.filter(receiver=user)
    serializer = MessageSerializer(messages, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getSentMessages(request):
    user = request.user
    messages = Message.objects.filter(sender=user)
    serializer = MessageSerializer(messages, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUnreadMessages(request):
    user = request.user
    messages = Message.objects.filter(receiver=user, isRead=False)
    serializer = MessageSerializer(messages, many=True)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def markAsRead(request, pk):
    message = Message.objects.get(_id=pk)
    message.isRead = True
    message.save()
    return Response('Message Marked as Read')

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteMessage(request, pk):
    message = Message.objects.get(_id=pk)
    message.delete()
    return Response('Message Deleted')

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteAllMessages(request):
    user = request.user
    messages = Message.objects.filter(receiver=user)
    messages.delete()
    return Response('All Messages Deleted')

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteAllSentMessages(request):
    user = request.user
    messages = Message.objects.filter(sender=user)
    messages.delete()
    return Response('All Sent Messages Deleted')

