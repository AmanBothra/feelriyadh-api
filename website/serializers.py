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
        fields = [
            'chalet', 'banner_image', 'chalet_image', 'start_date', 'end_date', 'price'
        ]


class ChaletSerializer(serializers.ModelSerializer):
    chalet_details = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = models.Chalet
        fields = [
            'id',
            'name',
            'description',
            'terms_and_conditions',
            'chalet_details'
        ]

    def get_chalet_details(self, obj):
        chalet_prices = obj.chalet_prices
        serializer = ChaletPriceSerializer(chalet_prices, context={'request': self.context['request']})
        return serializer.data
