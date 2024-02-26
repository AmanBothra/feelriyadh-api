from dj_rest_kit.constants import FileFieldConstants
from dj_rest_kit.helpers import PathAndRename
from django.core.exceptions import ValidationError
from django.core.mail import send_mail, EmailMultiAlternatives
from django.core.validators import FileExtensionValidator
from django.db import models
from django.template.loader import render_to_string
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
    description = HTMLField(default="", null=True, blank=True)

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


class Chalet(models.Model):
    name = models.CharField(max_length=250, unique=True)
    description = HTMLField()
    banner_image = models.ImageField(upload_to=PathAndRename("chalet/banner/"), validators=[
        FileExtensionValidator(FileFieldConstants.IMAGE_FORMATS)])
    chalet_image = models.ImageField(upload_to=PathAndRename("chalet/room/"), validators=[
        FileExtensionValidator(FileFieldConstants.IMAGE_FORMATS)])
    terms_and_conditions = HTMLField()

    class Meta:
        verbose_name = verbose_name_plural = _("Chalet")

    def __str__(self):
        return self.name


class ChaletPrice(models.Model):
    chalet = models.ForeignKey(Chalet, on_delete=models.CASCADE, related_name='chalet_prices')
    start_date = models.DateField()
    end_date = models.DateField()
    price = models.DecimalField(max_digits=20, decimal_places=2, default=0.00)

    def __str__(self):
        return f"{self.chalet.name} - {self.start_date} to {self.end_date}"

    class Meta:
        verbose_name = verbose_name_plural = _("Chalet Price")


class ChaletNewPrice(models.Model):
    chalet = models.ForeignKey(Chalet, on_delete=models.CASCADE, related_name='chalet_new_prices')
    date = models.DateField()
    price = models.DecimalField(max_digits=20, decimal_places=2, default=0.00)

    def __str__(self):
        return f"{self.chalet.name} - {self.date} to {self.price}"

    class Meta:
        verbose_name = verbose_name_plural = _("Chalet New Price")


class ChaletFullBooking(models.Model):
    full_date = models.DateField(unique=True)
    chalet = models.ForeignKey(Chalet, on_delete=models.CASCADE)

    def __str__(self):
        return f"Full Bookings for {self.full_date} - {self.chalet}"


class ChaletBooking(models.Model):
    booking_id = models.CharField(max_length=4, editable=False, unique=True)
    chalet = models.ForeignKey(Chalet, on_delete=models.CASCADE, related_name='chalet_booking')
    booking_date = models.DateField()
    total_price = models.DecimalField(max_digits=20, decimal_places=2)
    name = models.CharField(max_length=100, null=True, blank=True)
    phone_number = models.CharField(max_length=20, null=True, blank=True)
    email = models.EmailField(max_length=100, null=True, blank=True)
    birthday = models.DateField(null=True, blank=True)
    special_request = models.TextField(null=True, blank=True)

    def __str__(self):
        return f"{self.chalet.name} - {self.booking_date}"

    class Meta:
        verbose_name = verbose_name_plural = _("Chalet Booking")

    def save(self, *args, **kwargs):
        if not self.booking_id:
            # Generate the next booking ID based on existing bookings for the room
            last_booking = ChaletBooking.objects.all().order_by('-booking_id').first()

            if last_booking and last_booking.booking_id:
                last_booking_id = int(last_booking.booking_id)
                new_booking_id = str(last_booking_id + 1).zfill(4)
            else:
                new_booking_id = "1001"

            self.booking_id = new_booking_id

            subject = _('New booking request')
            data = {
                'booking_id': self.booking_id,
                'name': self.name,
                'email': self.email,
                'phone_number': self.phone_number,
                'booking_date': self.booking_date,
                'price': self.total_price,
            }
            html_message = render_to_string('booking_email_template.html', data)
            message = "New Booking Request"
            email = EmailMultiAlternatives(subject, message, 'feelriyadh@gmail.com', [self.email])
            email.attach_alternative(html_message, "text/html")
            email.send()

        super(ChaletBooking, self).save(*args, **kwargs)

        bookings_count = ChaletBooking.objects.filter(chalet=self.chalet, booking_date=self.booking_date).count()
        if bookings_count == 4:
            # Create a new ChaletFullBooking entry for this date and chalet
            ChaletFullBooking.objects.create(full_date=self.booking_date, chalet=self.chalet)


class Enquiry(models.Model):
    name = models.CharField(max_length=50)
    email = models.EmailField()
    phone_number = models.CharField(max_length=15)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = verbose_name_plural = _("Enquiry")
