from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth.models import UserManager, AbstractBaseUser, PermissionsMixin
from datetime import datetime
from django.utils.translation import gettext_lazy as _
from django.utils import timezone

class Category(models.Model):
    name = models.CharField(max_length=100)
    created_at = models.DateTimeField(default=datetime.now, blank=True)
    updated_at = models.DateTimeField(default=datetime.now, blank=True)

    def __str__(self):
        return self.name
