from rest_framework.viewsets import ModelViewSet

from . import models
from . import serializers


class BannerViewSet(ModelViewSet):
    queryset = models.Banner.objects.all()
    serializer_class = serializers.BannerSerializer
    http_method_names = ['get']


class AboutViewSet(ModelViewSet):
    queryset = models.About.objects.all()
    serializer_class = serializers.AboutSerializer
    http_method_names = ['get']


class CounterViewSet(ModelViewSet):
    queryset = models.Counter.objects.all()
    serializer_class = serializers.CounterSerializer
    http_method_names = ['get']


class SplendorViewSet(ModelViewSet):
    queryset = models.Splendor.objects.all()
    serializer_class = serializers.SplendorSerializer
    http_method_names = ['get']


class FeatureViewSet(ModelViewSet):
    queryset = models.Feature.objects.all()
    serializer_class = serializers.FeatureSerializer
    http_method_names = ['get']


class GalleryViewSet(ModelViewSet):
    queryset = models.Gallery.objects.all()
    serializer_class = serializers.GallerySerializer
    http_method_names = ['get']


class EnquiryViewSet(ModelViewSet):
    queryset = models.Enquiry.objects.all()
    serializer_class = serializers.EnquirySerializer
    http_method_names = ['post']
