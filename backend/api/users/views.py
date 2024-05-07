from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import *
from api.models import *
from rest_framework.permissions import IsAuthenticated
from rest_framework import status



class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['id'] = user.id
        token['email'] = user.email
        token['username'] = user.username
        token['first_name'] = user.first_name
        token['last_name'] = user.last_name
        # token['date_joined'] = user.date_joined
        token['phone'] = user.phone
        token['address'] = user.address


        # ...

        return token
    
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


#use jwt.io to see results of what you are doing
@api_view(['GET'])
def getRoutes(request):

    routes = [
        'api/login',
        'api/login/refresh'
    ]
    return Response(routes)

@api_view(['POST'])
def registerUser(request):
    data = request.data
    
    try:
        user = User.objects.create_user(
            email=data['email'],
            password=data['password'],
            username=data['username'],
            first_name=data.get('firstname', ''),
            last_name=data.get('lastname', ''),
            phone=data.get('phone', ''),
            address=data.get('address', ''),
        )
        user.set_password(data['password'])
        user.save()
        serializer = RegisterUserSerializer(user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    except KeyError as e:
        return Response({'detail': f'Missing key: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)
    except ValueError as e:
        return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    except ValidationError as e:
        return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({'detail': 'There is a problem with your registration'}, status=status.HTTP_400_BAD_REQUEST)






@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    serializer = UserSerializerWithToken(user, many=False)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserById(request, pk):
    user = User.objects.get(id=pk)
    serializer = UserSerializerWithToken(user, many=False)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializerWithToken(users, many=True)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
    user = request.user
    serializer = UserSerializerWithToken(user, many=False)
    data = request.data

    user.first_name = data['name']
    user.username = data['username']
    user.email = data['email']
    user.save()

