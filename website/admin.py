from django.contrib import admin
from modeltranslation.admin import TranslationAdmin

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


class AmenitiesInline(admin.StackedInline):
    model = models.Amenities
    extra = 1


class AmenitiesHeaderAdmin(admin.ModelAdmin):
    inlines = [AmenitiesInline]


admin.site.register(models.Banner, BannerAdmin)
admin.site.register(models.About, AboutAdmin)
admin.site.register(models.Counter, CounterAdmin)
admin.site.register(models.Splendor, SplendorAdmin)
admin.site.register(models.Enquiry, EnquiryAdmin)
admin.site.register(models.Feature, FeatureAdmin)
admin.site.register(models.Gallery)
admin.site.register(models.BaseAmenities, AmenitiesHeaderAdmin)
