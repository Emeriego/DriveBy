from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth.models import UserManager, AbstractBaseUser, PermissionsMixin
from datetime import datetime
from django.utils.translation import gettext_lazy as _
from django.utils import timezone
from api.models import User
from api.cars.models import Car


class Booking(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    car = models.ForeignKey(Car, on_delete=models.CASCADE)
    start_date = models.CharField(max_length=100)
    end_date = models.CharField(max_length=100)
    total_price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    total_hours = models.IntegerField(default=0)
    status = models.CharField(max_length=100, default='Pending')
    created_at = models.DateTimeField(default=datetime.now, blank=True)
    updated_at = models.DateTimeField(default=datetime.now, blank=True)

    def __str__(self):
        return str(self.user)
