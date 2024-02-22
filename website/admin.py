from django.contrib import admin
from modeltranslation.admin import TranslationAdmin, TranslationStackedInline

from . import models


class BannerAdmin(TranslationAdmin):
    pass


class AboutAdmin(TranslationAdmin):
    pass


class CounterAdmin(TranslationAdmin):
    list_display = ['title', 'value']


class SplendorAdmin(TranslationAdmin):
    pass


class FeatureAdmin(TranslationAdmin):
    pass


class EnquiryAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'phone_number', 'date']


class AmenitiesInline(TranslationStackedInline):
    model = models.Amenities
    extra = 1


class AmenitiesHeaderAdmin(admin.ModelAdmin):
    inlines = [AmenitiesInline]


class ChaletAdmin(TranslationAdmin):
    pass


class ChaletPriceAdmin(admin.ModelAdmin):
    list_display = ['chalet', 'start_date', 'end_date', 'price']


class ChaletBookingAdmin(admin.ModelAdmin):
    list_display = ['booking_id', 'chalet', 'booking_date', 'total_price', 'name', 'phone_number', 'email']


admin.site.register(models.Banner, BannerAdmin)
admin.site.register(models.About, AboutAdmin)
admin.site.register(models.Counter, CounterAdmin)
admin.site.register(models.Splendor, SplendorAdmin)
admin.site.register(models.Enquiry, EnquiryAdmin)
admin.site.register(models.Feature, FeatureAdmin)
admin.site.register(models.Gallery)
admin.site.register(models.ChaletNewPrice)
admin.site.register(models.ChaletHoliday)
admin.site.register(models.BaseAmenities, AmenitiesHeaderAdmin)
admin.site.register(models.Chalet, ChaletAdmin)
admin.site.register(models.ChaletPrice, ChaletPriceAdmin)
admin.site.register(models.ChaletBooking, ChaletBookingAdmin)
