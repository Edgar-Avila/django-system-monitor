from django.urls import path
from . import views

urlpatterns = [
    path("memory/", views.memory),
    path("cpu/", views.cpu),
    path("disk/", views.disk),
    path("unap/", views.unap),
    path("mysql/", views.mysql),
    path("pages/memory", views.memory_template),
    path("pages/cpu", views.cpu_template),
    path("pages/disk", views.disk_template),
    path("pages/unap", views.unap_template),
    path("pages/mysql", views.mysql_template),
]
