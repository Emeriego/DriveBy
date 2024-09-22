from django.urls import path
from .views import *
# from api.views import getRoutes
# from api.users.views import MyTokenObtainPairView

urlpatterns = [
    path('',    getCars, name='cars'), #localhost:8000/api/cars/
    path('create/', createCar, name='car-create'), #localhost:8000/api/cars/create/
    path('upload/', uploadImage, name='upload-image'), #localhost:8000/api/cars/upload/
    path('<str:pk>/', getCar, name='car'), #localhost:8000/api/cars/1/
    path('update/<str:pk>/', updateCar, name='car-update'), #localhost:8000/api/cars/update/1/
    path('delete/<str:pk>/', deleteCar, name='car-delete'), #localhost:8000/api/cars/delete/1/
    path('book/<str:pk>/', createBooking, name='car-booking'),  #localhost:8000/api/cars/book/1/
    path('mycars/', getMyCars, name='my-cars'), #localhost:8000/api/cars/mycars/
    path('review/create/', createCarReview, name='my-cars'), #localhost:8000/api/cars/mycars/

]
