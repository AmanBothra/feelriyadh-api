from rest_framework import serializers

from . import models


class BannerSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Banner
        fields = '__all__'


class AboutSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.About
        fields = '__all__'


class CounterSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Counter
        fields = '__all__'


class SplendorSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Splendor
        fields = '__all__'


class FeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Feature
        fields = '__all__'


class GallerySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Gallery
        fields = '__all__'


class EnquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Enquiry
        fields = '__all__'
