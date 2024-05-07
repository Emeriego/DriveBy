from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from .serializers import *
# from api.users.models import User
from .models import Category
from rest_framework.permissions import IsAuthenticated


@api_view(['GET'])
def allCategories(request):
    categories = Category.objects.all()
    serializer = CategorySerializer(categories, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getCategory(request, pk):
    category = Category.objects.get(_id=pk)
    serializer = CategorySerializer(category, many=False)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createCategory(request):
    data = request.data

    category = Category.objects.create(
        name=data['name'],
    )
    serializer = CategorySerializer(category, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateCategory(request, pk):
    data = request.data
    category = Category.objects.get(_id=pk)
    category.name = data['name']
    category.save()
    serializer = CategorySerializer(category, many=False)
    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteCategory(request, pk):
    category = Category.objects.get(_id=pk)
    category.delete()
    return Response('Category Deleted')


