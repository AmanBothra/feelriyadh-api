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
    title_en = serializers.SerializerMethodField()
    title_ar = serializers.SerializerMethodField()
    description_en = serializers.SerializerMethodField()
    description_ar = serializers.SerializerMethodField()

    class Meta:
        model = models.Amenities
        fields = [
            'id', 'icon', 'amenities_image', 'title_en', 'title_ar', 'description_en', 'description_ar'
        ]

    def get_title_en(self, obj):
        return getattr(obj, 'title_en', obj.title)

    def get_title_ar(self, obj):
        return getattr(obj, 'title_ar', obj.title)

    def get_description_en(self, obj):
        return getattr(obj, 'description_en', obj.description)

    def get_description_ar(self, obj):
        return getattr(obj, 'description_ar', obj.description)


class ChaletNewPriceSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ChaletNewPrice
        fields = [
            'date', 'price'
        ]


class ChaletPriceSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ChaletPrice
        fields = [
            'chalet', 'start_date', 'end_date', 'price'
        ]


class ChaletFullBookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ChaletFullBooking
        fields = ['full_date']


class ChaletSerializer(serializers.ModelSerializer):
    name_en = serializers.SerializerMethodField()
    name_ar = serializers.SerializerMethodField()
    description_en = serializers.SerializerMethodField()
    description_ar = serializers.SerializerMethodField()
    terms_and_conditions_en = serializers.SerializerMethodField()
    terms_and_conditions_ar = serializers.SerializerMethodField()
    chalet_details = serializers.SerializerMethodField(read_only=True)
    new_price = serializers.SerializerMethodField()
    booked_dates = serializers.SerializerMethodField()

    class Meta:
        model = models.Chalet
        fields = [
            'id', 'name_en', 'name_ar', 'description_en', 'description_ar', 'terms_and_conditions_en',
            'terms_and_conditions_ar', 'chalet_details', 'banner_image', 'chalet_image', 'new_price', 'booked_dates'
        ]

    def get_name_en(self, obj):
        return getattr(obj, 'name_en', obj.name)

    def get_name_ar(self, obj):
        return getattr(obj, 'name_ar', obj.name)

    def get_description_en(self, obj):
        return getattr(obj, 'description_en', obj.description)

    def get_description_ar(self, obj):
        return getattr(obj, 'description_ar', obj.description)

    def get_terms_and_conditions_en(self, obj):
        return getattr(obj, 'terms_and_conditions_en', obj.terms_and_conditions)

    def get_terms_and_conditions_ar(self, obj):
        return getattr(obj, 'terms_and_conditions_ar', obj.terms_and_conditions)

    def get_chalet_details(self, obj):
        chalet_prices = obj.chalet_prices.all()
        serializer = ChaletPriceSerializer(chalet_prices, many=True)
        return serializer.data

    def get_new_price(self, obj):
        chalet_new_prices = obj.chalet_new_prices.all()
        serializer = ChaletNewPriceSerializer(chalet_new_prices, many=True)
        return serializer.data

    def get_booked_dates(self, obj):
        chalet_full_bookings = models.ChaletFullBooking.objects.filter(chalet=obj)
        booked_dates = list(chalet_full_bookings.values_list('full_date', flat=True))
        return booked_dates


class ChaletBookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ChaletBooking
        fields = '__all__'
