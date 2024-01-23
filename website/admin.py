from django.contrib import admin
from modeltranslation.admin import TranslationAdmin, TranslationInlineModelAdmin, TranslationStackedInline

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


class ChaletInline(TranslationStackedInline):
    model = models.Chalet
    extra = 1


class ChaletHeaderAdmin(admin.ModelAdmin):
    inlines = [ChaletInline]


admin.site.register(models.Banner, BannerAdmin)
admin.site.register(models.About, AboutAdmin)
admin.site.register(models.Counter, CounterAdmin)
admin.site.register(models.Splendor, SplendorAdmin)
admin.site.register(models.Enquiry, EnquiryAdmin)
admin.site.register(models.Feature, FeatureAdmin)
admin.site.register(models.Gallery)
admin.site.register(models.BaseAmenities, AmenitiesHeaderAdmin)
admin.site.register(models.BaseChalet, ChaletHeaderAdmin)
admin.site.register(models.ChaletPrice)
admin.site.register(models.ChaletBooking)