from django.urls import path
from .views import *
# from api.views import getRoutes
# from api.users.views import MyTokenObtainPairView

urlpatterns = [
    path('',    getAllBookings, name='bookings'), #localhost:8000/api/bookings/
    path('user/', getUserBookings, name='user-bookings'), #localhost:8000/api/bookings/user/
    path('<str:pk>/', getCarBookings, name='booking'), #localhost:8000/api/bookings/1/
    path('<str:pk>/booking/', getBookingById, name='booking'), #localhost:8000/api/bookings/1/
    path('<str:pk>/complete/', completeBooking, name='booking-complete'), #localhost:8000/api/bookings/complete/1/
    path('<str:pk>/confirm/', confirmBooking, name='booking-paid'), #localhost:8000/api/bookings/1/confirm
    path('<str:pk>/reject/', rejectBooking, name='booking-rejected'), #localhost:8000/api/bookings/1/reject
    path('<str:pk>/cancel/', cancelBooking, name='booking-cancel'), #localhost:8000/api/bookings/delete/1/
]
