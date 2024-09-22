from django.db import models
from api.models import User


# Create your models here.
from datetime import datetime
from django.utils.translation import gettext_lazy as _

class Message(models.Model):
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name="sent_messages")
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name="received_messages")
    message = models.TextField()
    isRead = models.BooleanField(default=False)
    sent_at = models.DateTimeField(default=datetime.now, blank=True)

    def __str__(self):
        return str(self.sender)
