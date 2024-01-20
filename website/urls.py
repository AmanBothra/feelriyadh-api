from django.urls import path, include
from rest_framework import routers

from . import views

router = routers.DefaultRouter(trailing_slash=False)
router.register("banner", views.BannerViewSet, basename="banner")
router.register("about", views.AboutViewSet, basename="about")
router.register("counter", views.CounterViewSet, basename="counter")
router.register("splendor", views.SplendorViewSet, basename="splendor")
router.register("feature", views.FeatureViewSet, basename="feature")
router.register("gallery", views.GalleryViewSet, basename="gallery")
router.register("enquiry", views.EnquiryViewSet, basename="enquiry")

urlpatterns = [
    path("", include(router.urls)),
]
