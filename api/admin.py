from django.contrib import admin
from api.models import *
from api.messages.models import *
from api.categories.models import *
from api.reviews.models import *
from api.cars.models import *
from api.bookings.models import *

# Register your models here.
admin.site.register(User)
admin.site.register(Car)
admin.site.register(Booking)
admin.site.register(UserReview)
admin.site.register(CarReview)
admin.site.register(Message)
admin.site.register(Category)


