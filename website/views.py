from rest_framework.generics import ListAPIView
from rest_framework.viewsets import ModelViewSet

from . import models
from . import serializers


class BannerViewSet(ListAPIView):
    queryset = models.Banner.objects.all()
    serializer_class = serializers.BannerSerializer


class AboutViewSet(ListAPIView):
    queryset = models.About.objects.all()
    serializer_class = serializers.AboutSerializer


class CounterViewSet(ListAPIView):
    queryset = models.Counter.objects.all()
    serializer_class = serializers.CounterSerializer


class SplendorViewSet(ListAPIView):
    queryset = models.Splendor.objects.all()
    serializer_class = serializers.SplendorSerializer


class FeatureViewSet(ListAPIView):
    queryset = models.Feature.objects.all()
    serializer_class = serializers.FeatureSerializer


class GalleryViewSet(ListAPIView):
    queryset = models.Gallery.objects.all()
    serializer_class = serializers.GallerySerializer


class EnquiryViewSet(ModelViewSet):
    queryset = models.Enquiry.objects.all()
    serializer_class = serializers.EnquirySerializer
    http_method_names = ['post']


class AmenitiesViewSet(ListAPIView):
    queryset = models.Amenities.objects.all()
    serializer_class = serializers.AmenitiesSerializer


class ChaletViewSet(ModelViewSet):
    queryset = models.Chalet.objects.all()
    serializer_class = serializers.ChaletSerializer
    http_method_names = ['get']


class ChaletBookingViewSet(ModelViewSet):
    queryset = models.ChaletBooking.objects.all()
    serializer_class = serializers.ChaletBookingSerializer
    http_method_names = ['post']
