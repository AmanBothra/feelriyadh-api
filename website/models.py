from dj_rest_kit.constants import FileFieldConstants
from dj_rest_kit.helpers import PathAndRename
from django.core.exceptions import ValidationError
from django.core.validators import FileExtensionValidator
from django.db import models
from django.utils.translation import gettext_lazy as _
from tinymce.models import HTMLField


class Banner(models.Model):
    banner_image = models.ImageField(upload_to=PathAndRename("banner/"), validators=[
        FileExtensionValidator(FileFieldConstants.IMAGE_FORMATS)])
    title = models.CharField(max_length=50)

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if Banner.objects.exists() and not self.pk:
            raise ValidationError(_('You can only create one Banner object.'))

        return super().save(*args, **kwargs)

    class Meta:
        verbose_name = verbose_name_plural = _("Banner")


class About(models.Model):
    content = HTMLField()
    mobile_number = models.CharField(max_length=15)
    facebook = models.URLField(null=True, blank=True)
    instagram = models.URLField(null=True, blank=True)
    twitter = models.URLField(null=True, blank=True)
    address = HTMLField()

    def __str__(self):
        return "About Content"

    def save(self, *args, **kwargs):
        if About.objects.exists() and not self.pk:
            raise ValidationError(_('You can only create one About object.'))

        return super().save(*args, **kwargs)

    class Meta:
        verbose_name = verbose_name_plural = _("About")


class Counter(models.Model):
    title = models.CharField(max_length=50)
    value = models.CharField(max_length=50)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = verbose_name_plural = _("About Counter")


class Gallery(models.Model):
    image = models.ImageField(upload_to=PathAndRename("gallery/"), validators=[
        FileExtensionValidator(FileFieldConstants.IMAGE_FORMATS)])

    def __str__(self):
        return "Gallery"

    class Meta:
        verbose_name = verbose_name_plural = _("Gallery")


class Feature(models.Model):
    icon = models.ImageField(upload_to=PathAndRename("feature/"), validators=[
        FileExtensionValidator(FileFieldConstants.IMAGE_FORMATS)])
    title = models.CharField(max_length=250, unique=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = verbose_name_plural = _("Feature")


class Splendor(models.Model):
    image = models.ImageField(upload_to=PathAndRename("splendor/"), validators=[
        FileExtensionValidator(FileFieldConstants.IMAGE_FORMATS)])
    title = models.CharField(max_length=250, unique=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = verbose_name_plural = _("Splendor")


class BaseAmenities(models.Model):
    image = models.ImageField(upload_to=PathAndRename("amenities/"), validators=[
        FileExtensionValidator(FileFieldConstants.IMAGE_FORMATS)])

    class Meta:
        verbose_name = verbose_name_plural = _("Amenities")


class Amenities(models.Model):
    icon = models.ImageField(upload_to=PathAndRename("amenities/icon/"), validators=[
        FileExtensionValidator(FileFieldConstants.IMAGE_FORMATS)])
    title = models.CharField(max_length=250, unique=True)
    description = HTMLField()
    plugin = models.ForeignKey(
        BaseAmenities, on_delete=models.CASCADE, related_name="amenities_plugins"
    )

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = verbose_name_plural = _("Amenities")


class Enquiry(models.Model):
    name = models.CharField(max_length=50)
    email = models.EmailField()
    phone_number = models.CharField(max_length=15)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = verbose_name_plural = _("Enquiry")
