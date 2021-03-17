from requests import Response
from rest_framework import filters, status
from django.db.models import IntegerField
from django.db.models import Case, CharField, Value
from django.db.models import F, Q, When
from django.db.models import Count, Sum, Value
from django.db.models.functions import Coalesce
from django_filters.rest_framework import DjangoFilterBackend
from django.contrib.auth.models import User
import django_filters
from django_filters import FilterSet, Filter
from django_filters.fields import Lookup
from rest_framework import viewsets, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import viewsets, permissions
from rest_framework.pagination import PageNumberPagination
from rest_framework.generics import RetrieveAPIView

from pins.models import pin
import logging

logger = logging.getLogger(__name__)
class RunAcmView(APIView):
    
    def get(self, request, format=None):
        return Response({'testKey' : 'test value'})