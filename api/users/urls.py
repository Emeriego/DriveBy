from django.urls import path
from api.users.views import *
# from api.views import getRoutes
# from api.users.views import MyTokenObtainPairView

from rest_framework_simplejwt.views import TokenRefreshView


urlpatterns = [
    path('',    getUsers, name='users'),
    path('register/', registerUser, name='register'),
    path('login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('login/refresh/', TokenRefreshView.as_view(), name='login_refresh'),
    path('profile/', getUserProfile, name='users-profile'),
    path('<str:pk>/', getUserById, name='user'),
    # path('profile/update/', updateUserProfile, name='users-profile-update'),
    # path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
