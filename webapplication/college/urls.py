from django.urls import path, include
from .views import *

urlpatterns = [
path('college/list', CollegeListView.as_view(), name="college list"),
path('college/add/edit', CollegeAddEdit.as_view(), name="college add"),
path('college/delete', CollegeDelete.as_view(), name="college delete"),
path('college/details', CollegeDetail.as_view(), name="college detail"),
# path('college/statuschange', CollegeStatusChange.as_view(), name="college status change"),
    ]