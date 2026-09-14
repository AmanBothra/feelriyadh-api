# Generated from the current website models for the initial database schema.

import dj_rest_kit.helpers
import django.core.validators
import django.db.models.deletion
import tinymce.models
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="About",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("content", tinymce.models.HTMLField()),
                ("content_en", tinymce.models.HTMLField(null=True)),
                ("content_ar", tinymce.models.HTMLField(null=True)),
                ("mobile_number", models.CharField(max_length=15)),
                ("mobile_number_en", models.CharField(max_length=15, null=True)),
                ("mobile_number_ar", models.CharField(max_length=15, null=True)),
                ("facebook", models.URLField(blank=True, null=True)),
                ("instagram", models.URLField(blank=True, null=True)),
                ("twitter", models.URLField(blank=True, null=True)),
                ("address", tinymce.models.HTMLField()),
                ("address_en", tinymce.models.HTMLField(null=True)),
                ("address_ar", tinymce.models.HTMLField(null=True)),
            ],
            options={
                "verbose_name": "About",
                "verbose_name_plural": "About",
            },
        ),
        migrations.CreateModel(
            name="Banner",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                (
                    "banner_image",
                    models.ImageField(
                        upload_to=dj_rest_kit.helpers.PathAndRename("banner/"),
                        validators=[
                            django.core.validators.FileExtensionValidator(
                                ["png", "jpg", "jpeg", "svg", "webp"]
                            )
                        ],
                    ),
                ),
                ("title", models.CharField(max_length=50)),
                ("title_en", models.CharField(max_length=50, null=True)),
                ("title_ar", models.CharField(max_length=50, null=True)),
            ],
            options={
                "verbose_name": "Banner",
                "verbose_name_plural": "Banner",
            },
        ),
        migrations.CreateModel(
            name="BaseAmenities",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                (
                    "image",
                    models.ImageField(
                        upload_to=dj_rest_kit.helpers.PathAndRename("amenities/"),
                        validators=[
                            django.core.validators.FileExtensionValidator(
                                ["png", "jpg", "jpeg", "svg", "webp"]
                            )
                        ],
                    ),
                ),
            ],
            options={
                "verbose_name": "Amenities",
                "verbose_name_plural": "Amenities",
            },
        ),
        migrations.CreateModel(
            name="Chalet",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("name", models.CharField(max_length=250, unique=True)),
                ("name_en", models.CharField(max_length=250, null=True, unique=True)),
                ("name_ar", models.CharField(max_length=250, null=True, unique=True)),
                ("description", tinymce.models.HTMLField()),
                ("description_en", tinymce.models.HTMLField(null=True)),
                ("description_ar", tinymce.models.HTMLField(null=True)),
                (
                    "banner_image",
                    models.ImageField(
                        upload_to=dj_rest_kit.helpers.PathAndRename("chalet/banner/"),
                        validators=[
                            django.core.validators.FileExtensionValidator(
                                ["png", "jpg", "jpeg", "svg", "webp"]
                            )
                        ],
                    ),
                ),
                (
                    "chalet_image",
                    models.ImageField(
                        upload_to=dj_rest_kit.helpers.PathAndRename("chalet/room/"),
                        validators=[
                            django.core.validators.FileExtensionValidator(
                                ["png", "jpg", "jpeg", "svg", "webp"]
                            )
                        ],
                    ),
                ),
                ("terms_and_conditions", tinymce.models.HTMLField()),
                ("terms_and_conditions_en", tinymce.models.HTMLField(null=True)),
                ("terms_and_conditions_ar", tinymce.models.HTMLField(null=True)),
            ],
            options={
                "verbose_name": "Chalet",
                "verbose_name_plural": "Chalet",
            },
        ),
        migrations.CreateModel(
            name="Counter",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("title", models.CharField(max_length=50)),
                ("title_en", models.CharField(max_length=50, null=True)),
                ("title_ar", models.CharField(max_length=50, null=True)),
                ("value", models.CharField(max_length=50)),
            ],
            options={
                "verbose_name": "About Counter",
                "verbose_name_plural": "About Counter",
            },
        ),
        migrations.CreateModel(
            name="Enquiry",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("name", models.CharField(max_length=50)),
                ("email", models.EmailField(max_length=254)),
                ("phone_number", models.CharField(max_length=15)),
                ("date", models.DateTimeField(auto_now_add=True)),
            ],
            options={
                "verbose_name": "Enquiry",
                "verbose_name_plural": "Enquiry",
            },
        ),
        migrations.CreateModel(
            name="Feature",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                (
                    "icon",
                    models.ImageField(
                        upload_to=dj_rest_kit.helpers.PathAndRename("feature/"),
                        validators=[
                            django.core.validators.FileExtensionValidator(
                                ["png", "jpg", "jpeg", "svg", "webp"]
                            )
                        ],
                    ),
                ),
                ("title", models.CharField(max_length=250, unique=True)),
                ("title_en", models.CharField(max_length=250, null=True, unique=True)),
                ("title_ar", models.CharField(max_length=250, null=True, unique=True)),
                ("description", tinymce.models.HTMLField(blank=True, default="", null=True)),
                ("description_en", tinymce.models.HTMLField(blank=True, default="", null=True)),
                ("description_ar", tinymce.models.HTMLField(blank=True, default="", null=True)),
            ],
            options={
                "verbose_name": "Feature",
                "verbose_name_plural": "Feature",
            },
        ),
        migrations.CreateModel(
            name="FeatureImage",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                (
                    "image",
                    models.ImageField(
                        upload_to=dj_rest_kit.helpers.PathAndRename("feature/"),
                        validators=[
                            django.core.validators.FileExtensionValidator(
                                ["png", "jpg", "jpeg", "svg", "webp"]
                            )
                        ],
                    ),
                ),
            ],
            options={
                "verbose_name": "Feature Image",
                "verbose_name_plural": "Feature Image",
            },
        ),
        migrations.CreateModel(
            name="Gallery",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                (
                    "image",
                    models.ImageField(
                        upload_to=dj_rest_kit.helpers.PathAndRename("gallery/"),
                        validators=[
                            django.core.validators.FileExtensionValidator(
                                ["png", "jpg", "jpeg", "svg", "webp"]
                            )
                        ],
                    ),
                ),
            ],
            options={
                "verbose_name": "Gallery",
                "verbose_name_plural": "Gallery",
            },
        ),
        migrations.CreateModel(
            name="Splendor",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                (
                    "image",
                    models.ImageField(
                        upload_to=dj_rest_kit.helpers.PathAndRename("splendor/"),
                        validators=[
                            django.core.validators.FileExtensionValidator(
                                ["png", "jpg", "jpeg", "svg", "webp"]
                            )
                        ],
                    ),
                ),
                ("title", models.CharField(max_length=250, unique=True)),
                ("title_en", models.CharField(max_length=250, null=True, unique=True)),
                ("title_ar", models.CharField(max_length=250, null=True, unique=True)),
            ],
            options={
                "verbose_name": "Splendor",
                "verbose_name_plural": "Splendor",
            },
        ),
        migrations.CreateModel(
            name="Amenities",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                (
                    "icon",
                    models.ImageField(
                        upload_to=dj_rest_kit.helpers.PathAndRename("amenities/icon/"),
                        validators=[
                            django.core.validators.FileExtensionValidator(
                                ["png", "jpg", "jpeg", "svg", "webp"]
                            )
                        ],
                    ),
                ),
                ("title", models.CharField(max_length=250, unique=True)),
                ("title_en", models.CharField(max_length=250, null=True, unique=True)),
                ("title_ar", models.CharField(max_length=250, null=True, unique=True)),
                ("description", tinymce.models.HTMLField()),
                ("description_en", tinymce.models.HTMLField(null=True)),
                ("description_ar", tinymce.models.HTMLField(null=True)),
                (
                    "plugin",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="amenities_plugins",
                        to="website.baseamenities",
                    ),
                ),
            ],
            options={
                "verbose_name": "Amenities",
                "verbose_name_plural": "Amenities",
            },
        ),
        migrations.CreateModel(
            name="ChaletBooking",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("booking_id", models.CharField(editable=False, max_length=4, unique=True)),
                ("booking_date", models.DateField()),
                ("total_price", models.DecimalField(decimal_places=2, max_digits=20)),
                ("name", models.CharField(blank=True, max_length=100, null=True)),
                ("phone_number", models.CharField(blank=True, max_length=20, null=True)),
                ("email", models.EmailField(blank=True, max_length=100, null=True)),
                ("birthday", models.DateField(blank=True, null=True)),
                ("special_request", models.TextField(blank=True, null=True)),
                (
                    "chalet",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="chalet_booking",
                        to="website.chalet",
                    ),
                ),
            ],
            options={
                "verbose_name": "Chalet Booking",
                "verbose_name_plural": "Chalet Booking",
            },
        ),
        migrations.CreateModel(
            name="ChaletFullBooking",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("full_date", models.DateField(unique=True)),
                ("chalet", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to="website.chalet")),
            ],
        ),
        migrations.CreateModel(
            name="ChaletNewPrice",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("date", models.DateField()),
                ("price", models.DecimalField(decimal_places=2, default=0.0, max_digits=20)),
                (
                    "chalet",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="chalet_new_prices",
                        to="website.chalet",
                    ),
                ),
            ],
            options={
                "verbose_name": "Chalet New Price",
                "verbose_name_plural": "Chalet New Price",
            },
        ),
        migrations.CreateModel(
            name="ChaletPrice",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("start_date", models.DateField()),
                ("end_date", models.DateField()),
                ("price", models.DecimalField(decimal_places=2, default=0.0, max_digits=20)),
                (
                    "chalet",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="chalet_prices",
                        to="website.chalet",
                    ),
                ),
            ],
            options={
                "verbose_name": "Chalet Price",
                "verbose_name_plural": "Chalet Price",
            },
        ),
    ]
