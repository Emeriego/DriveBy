from django.urls import path
from api.messages.views import *
# from api.views import getRoutes
# from api.users.views import MyTokenObtainPairView



urlpatterns = [
    path('',    allMessages, name='all_messages'),
    path('create/', createMessage, name='create_message'),
    path('sent/', getSentMessages, name='sent_messages'),
    path('unread/', getUnreadMessages, name='unread_messages'),
    path('markAsRead/<str:pk>/', markAsRead, name='mark_as_read'),
    path('delete/<str:pk>/', deleteMessage, name='delete_message'),
    path('deleteAll/', deleteAllMessages, name='delete_all_messages'),
    path('deleteAllSent/', deleteAllSentMessages, name='delete_all_sent_messages'),
    
]
