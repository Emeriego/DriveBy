from django.urls import path, include
from api.users.views import *
from api.users.views import getRoutes
from api.users.views import MyTokenObtainPairView

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


urlpatterns = [
    path('',    getRoutes),
    path('register/', registerUser, name='register'),
    path('login/', MyTokenObtainPairView.as_view(), name='login_obtain_pair'),
    path('login/refresh/', TokenRefreshView.as_view(), name='login_refresh'),
   
   
    # path('allcars/', allCars, name='allcars'),
# fetch('http://localhost:8000/api/users/register/', {
    
    path('bookings/', include('api.bookings.urls')),
    path('users/', include('api.users.urls')),
    path('messages/', include('api.messages.urls')),
    path('categories/', include('api.categories.urls')),
    path('cars/', include('api.cars.urls')),
    path('reviews/', include('api.reviews.urls')),



]
