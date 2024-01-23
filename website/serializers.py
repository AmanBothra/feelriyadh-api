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


class AmenitiesSerializer(serializers.ModelSerializer):
    amenities_image = serializers.ImageField(source='plugin.image', read_only=True)

    class Meta:
        model = models.Amenities
        fields = ['id', 'icon', 'title', 'description', 'amenities_image']


class ChaletPriceSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ChaletPrice
        fields = '__all__'


class ChaletSerializer(serializers.ModelSerializer):
    description = serializers.CharField(source='plugin.description', read_only=True)
    terms_and_conditions = serializers.CharField(source='plugin.terms_and_conditions', read_only=True)
    price = ChaletPriceSerializer(many=True, read_only=True)

    class Meta:
        model = models.Chalet
        fields = [
            'id',
            'name',
            'banner_image',
            'chalet_image',
            'description',
            'terms_and_conditions',
            'price'
        ]
