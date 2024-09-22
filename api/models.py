# Create your models here.
from django.db import models
from django.contrib.auth.models import UserManager, AbstractBaseUser, PermissionsMixin
from datetime import datetime
from django.utils.translation import gettext_lazy as _
from django.utils import timezone


# Create your models here.
class CustomUserManager(UserManager):
    def _create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        return user
    def create_user(self, email=None, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)
    
    def create_superuser(self, email=None, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self._create_user(email, password, **extra_fields)
    
class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField('email address', default='anon@gmail.com', unique=True)
    username = models.CharField('username', max_length=30, blank=True, unique=True)
    first_name = models.CharField('first name', max_length=30, blank=True)
    last_name = models.CharField('last name', max_length=30, blank=True)
    address = models.CharField('address', max_length=255, blank=True)
    phone = models.CharField('phone', max_length=15, blank=True)
    is_active = models.BooleanField('active', default=True)
    is_staff = models.BooleanField('staff', default=False)
    is_superuser = models.BooleanField('superuser', default=False)
    date_joined = models.DateTimeField('date joined', default=timezone.now())
    last_login = models.DateTimeField('last login', blank=True, null=True)
    objects = CustomUserManager()

    EMAIL_FIELD = 'email'
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    class Meta:
        verbose_name = _('user')
        verbose_name_plural = _('users')

    def __str__(self):
        return self.email

    def get_full_name(self):
        full_name = '%s %s' % (self.first_name, self.last_name)
        return full_name.strip()

    def get_short_name(self):
        return self.first_name

    # Define related_name for groups and user_permissions fields
    groups = models.ManyToManyField(
        'auth.Group',
        verbose_name=_('groups'),
        blank=True,
        related_name='custom_user_groups'  # Custom related_name for groups
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        verbose_name=_('user permissions'),
        blank=True,
        related_name='custom_user_permissions'  # Custom related_name for user_permissions
    )

    # def email_user(self, subject, message, from_email=None, **kwargs):
    #     send_mail(subject, message, from_email, [self.email], **kwargs)

# class User(AbstractUser):
#     address = models.CharField(max_length=250)
#     phone = models.CharField(max_length=100)
#     img = models.CharField(max_length=100, default="default_avatar.jpeg")

#     # def __str__(self):
#     #     return self.

#     # Specify unique related_name for groups and user_permissions fields
#     groups = models.ManyToManyField(
#         'auth.Group',
#         verbose_name=_('groups'),
#         blank=True,
#         related_name='user_groups'  # Unique related_name for groups
#     )
#     user_permissions = models.ManyToManyField(
#         'auth.Permission',
#         verbose_name=_('user permissions'),
#         blank=True,
#         related_name='user_permissions_set'  # Unique related_name for user_permissions
#     )

