from django.urls import path, include
from rest_framework import routers

from . import views

router = routers.DefaultRouter(trailing_slash=False)
router.register("enquiry", views.EnquiryViewSet, basename="enquiry")
router.register("chalet", views.ChaletViewSet, basename="chalet"),
router.register("chalet-booking", views.ChaletBookingViewSet, basename="chalet-booking"),

urlpatterns = [
    path("", include(router.urls)),
    path("banner", views.BannerViewSet.as_view(), name="banner"),
    path("about", views.AboutViewSet.as_view(), name="about"),
    path("counter", views.CounterViewSet.as_view(), name="counter"),
    path("splendor", views.SplendorViewSet.as_view(), name="splendor"),
    path("feature", views.FeatureViewSet.as_view(), name="feature"),
    path("gallery", views.GalleryViewSet.as_view(), name="gallery"),
    path("amenities", views.AmenitiesViewSet.as_view(), name="amenities"),
]
