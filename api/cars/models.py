from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth.models import UserManager, AbstractBaseUser, PermissionsMixin
from datetime import datetime
from django.utils.translation import gettext_lazy as _
from django.utils import timezone
from api.models import User
from api.categories.models import Category


class Car(models.Model):
    brand = models.CharField(max_length=100)
    model = models.CharField(max_length=100)
    color = models.CharField(max_length=100, default='black')
    img = models.ImageField(upload_to='car_images/', default='car_images/default.jpg')
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, default=4)
    location = models.CharField(max_length=100, default='No. 5, Freedom Street')
    city = models.CharField(max_length=100, default='Lagos')
    power = models.CharField(max_length=100, default='2000cc')
    condition = models.CharField(max_length=100, default='Good')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    numReviews = models.IntegerField(default=0)
    rating = models.IntegerField(default=0)

    created_at = models.DateTimeField(default=datetime.now, blank=True)
    updated_at = models.DateTimeField(default=datetime.now, blank=True)

    def __str__(self):
        return self.brand

