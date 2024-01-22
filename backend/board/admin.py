from .models import User, Topic, Board, Thread, Post
from .forms import MyUserChangeForm, MyUserCreationForm
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

admin.site.site_header = "Bulletin Board System"
admin.site.site_title = "Bulletin Board System"


class MyUserAdmin(UserAdmin):
    add_form = MyUserCreationForm
    form = MyUserChangeForm
    fieldsets = UserAdmin.fieldsets + (
        (
            None,
            {
                "fields": (
                    "about",
                    "birth_date",
                    "gender",
                    "avatar",
                    "is_moderator",
                    "is_administrator",
                    "is_banned",
                )
            },
        ),
    )
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": ("email", "username", "password1", "password2"),
            },
        ),
    )


admin.site.register(User, MyUserAdmin)
admin.site.register(Topic)
admin.site.register(Board)
admin.site.register(Thread)
admin.site.register(Post)
