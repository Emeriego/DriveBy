from django.urls import path
from .views import *
# from api.views import getRoutes
# from api.users.views import MyTokenObtainPairView


urlpatterns = [
    path('user/<str:pk>/',    getUserReviews, name='user_reviews'),
    path('car/<str:pk>/',    getCarReviews, name='car_reviews'),
    path('allusers/',    getAllUsers, name='all_users'),
    path('allcars/',    getAllCars, name='all_cars'),
    path('user/create/', createUserReview, name='create_user_review'),
    path('car/create/', createCarReview2, name='create_car_review'),
 
]
