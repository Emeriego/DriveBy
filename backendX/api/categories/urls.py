from django.urls import path
from api.categories.views import *
# from api.views import getRoutes
# from api.users.views import MyTokenObtainPairView



urlpatterns = [
    path('',    allCategories, name='get_categories'),
    path('create/', createCategory, name='create_category'),
    path('<str:pk>/', getCategory, name='get_category'),    
    path('update/<str:pk>/', updateCategory, name='update_category'),
    path('delete/<str:pk>/', deleteCategory, name='delete_category'),

]
