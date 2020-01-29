from rest_framework import filters
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
from .serializers import PinSerializer
from pins.models import pin, categoryType, upVoteStory, flagStory, commentStory, photo, Faq, aboutUs
from rest_framework import viewsets, permissions
from .serializers import PinSerializer, CategorySerializer, upVoteStorySerializer, FlagStorySerializer, CommentStorySerializer, AboutUsSerializer, FaqSerializer, PhotoSerializer
# catalog viewset


class DateFilter(FilterSet):
    startDate_gte = django_filters.DateTimeFilter(
        field_name="startDate", lookup_expr='gte')
    startDate_lte = django_filters.DateTimeFilter(
        field_name="startDate", lookup_expr='lte')
    endDate_gte = django_filters.DateTimeFilter(
        field_name="endDate", lookup_expr='gte')
    endDate_lte = django_filters.DateTimeFilter(
        field_name="endDate", lookup_expr='lte')

    class Meta:
        model = pin
        fields = ['startDate_gte', 'startDate_lte',
                  'endDate_gte', 'endDate_lte']


# used to split url query at ,
# only works for integer values (which is so far okay for category filtering)
class ListFilter(Filter):
    def filter(self, qs, value):
        if value not in (None, ''):
            integers = [int(v) for v in value.split(',')]
            return qs.filter(**{'%s__%s' % (self.field_name, self.lookup_expr): integers})
        return qs


# use the list filter above on the category field to match for or cases
class PinSearchFilter(FilterSet):
    categories = ListFilter(field_name='category', lookup_expr='in')

    startDate_gte = django_filters.DateTimeFilter(
        field_name="startDate", lookup_expr='gte')
    startDate_lte = django_filters.DateTimeFilter(
        field_name="startDate", lookup_expr='lte')
    endDate_gte = django_filters.DateTimeFilter(
        field_name="endDate", lookup_expr='gte')
    endDate_lte = django_filters.DateTimeFilter(
        field_name="endDate", lookup_expr='lte')

    class Meta:
        model = pin
        fields = ('categories',)


class PinViewSet(viewsets.ModelViewSet):
    # queryset = pin.objects.all()
    #   queryset = pin.objects.annotate(
    #      updoot=Coalesce(Sum('pinsUpvote__upvote'), Value(1))
    # )
    queryset = pin.objects.annotate(
        flagscore=Sum(Case(
            When(flaggerstory__flagged=True, then=1),
            default=Value(0),
            output_field=IntegerField()
        )),
        #updooots=Coalesce(Sum('updotes__upvote'), Value(0))
        updooots=Sum(Case(
            When(updotes__upvote=True, then=1),
            default=Value(0),
            output_field=IntegerField()
        )),


    )

    permission_classes = [
        permissions.AllowAny
        # permissions.IsAuthenticated,
    ]

    serializer_class = PinSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = '__all__'


class PinSearchViewSet(viewsets.ModelViewSet):
    queryset = pin.objects.all()
    serializer_class = PinSerializer
    filter_backends = [filters.SearchFilter, DjangoFilterBackend]
    filterset_fields = '__all__'
    filter_class = PinSearchFilter
    search_fields = ['title', 'description']


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = categoryType.objects.all()
    permission_classes = [
        permissions.AllowAny
        # permissions.IsAuthenticated,
    ]
    serializer_class = CategorySerializer


class upVoteStoryViewSet(viewsets.ModelViewSet):
    queryset = upVoteStory.objects.all()
    permission_classes = [
        permissions.AllowAny
        # permissions.IsAuthenticated,
    ]
    serializer_class = upVoteStorySerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = '__all__'


class FlagStoryViewSet(viewsets.ModelViewSet):
    queryset = flagStory.objects.all()
    permission_classes = [
        permissions.AllowAny
        # permissions.IsAuthenticated,
    ]
    serializer_class = FlagStorySerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = '__all__'


class CommentStoryViewSet(viewsets.ModelViewSet):
    queryset = commentStory.objects.all()
    permission_classes = [
        permissions.AllowAny
        # permissions.IsAuthenticated,
    ]
    serializer_class = CommentStorySerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = '__all__'


"""     def get_queryset(self):
        return self.request.user.pins.all()
    def perform_create(self, serializer):  # saves user id
        serializer.save(owner=self.request.user) """


class FaqViewSet(viewsets.ModelViewSet):
    queryset = Faq.objects.all()
    permission_classes = [
        permissions.AllowAny
        # permissions.IsAuthenticated,
    ]
    serializer_class = FaqSerializer


class PhotoViewSet(viewsets.ModelViewSet):
    queryset = photo.objects.all()
    permission_classes = [
        permissions.AllowAny
        # permissions.IsAuthenticated,
    ]
    serializer_class = PhotoSerializer
