from modeltranslation.translator import translator, TranslationOptions

from . import models


# for Banner model
class BannerTranslationOptions(TranslationOptions):
    fields = ('title',)


class AboutTranslationOptions(TranslationOptions):
    fields = ('content', 'mobile_number', 'address')


class CounterTranslationOptions(TranslationOptions):
    fields = ('title',)


class SplendorTranslationOptions(TranslationOptions):
    fields = ('title',)


class FeatureTranslationOptions(TranslationOptions):
    fields = ('title',)


class AmenitiesTranslationOptions(TranslationOptions):
    fields = ['title', 'description']


class ChaletTranslationOptions(TranslationOptions):
    fields = ('name', 'description', 'terms_and_conditions')


translator.register(models.Banner, BannerTranslationOptions)
translator.register(models.About, AboutTranslationOptions)
translator.register(models.Counter, CounterTranslationOptions)
translator.register(models.Splendor, SplendorTranslationOptions)
translator.register(models.Feature, FeatureTranslationOptions)
translator.register(models.Amenities, AmenitiesTranslationOptions)
translator.register(models.Chalet, ChaletTranslationOptions)
