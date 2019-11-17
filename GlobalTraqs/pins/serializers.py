from rest_framework import serializers
from pins.models import pin, categoryType, upVoteStory, flagStory
from django_restql.mixins import DynamicFieldsMixin
from django.contrib.auth.models import User

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = categoryType
        fields = '__all__'


class upVoteStorySerializer(DynamicFieldsMixin, serializers.ModelSerializer):
    class Meta:
        model = upVoteStory
        fields = '__all__'


class FlagStorySerializer(DynamicFieldsMixin, serializers.ModelSerializer):
    class Meta:
        model = flagStory
        fields = '__all__'


class PinSerializer(serializers.ModelSerializer):
  #  updoot = serializers.IntegerField()
  
    username = serializers.CharField(
        source="owner.username", read_only=True)
    categoryName = serializers.CharField(
        source="category.categoryName", read_only=True)
    #pinsUpvote = serializers.StringRelatedField(many=True)
    # pinsUpvote = upVoteStorySerializer(many=True, read_only=True)
    #pinsUpvoted = upVoteStorySerializer(many=True, read_only=True)
    updooots = serializers.IntegerField(read_only=True)
    flaggerstory = FlagStorySerializer(many=True, read_only=True)
    updotes = upVoteStorySerializer(many=True, read_only=True)
    class Meta:
        model = pin
        fields = '__all__'
