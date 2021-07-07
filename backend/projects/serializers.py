# serializers.py
from django.conf import settings
from rest_framework import serializers
from rest_framework.pagination import PageNumberPagination

# from django.contrib.auth.models import User
from django.http import HttpRequest

from .logic import addDomainToUrl
from .models import *


class FixAbsolutePathSerializer(serializers.Field):
	def to_representation(self, value):
		request = self.context.get('request')
		pattern = 'src=\"<URL>/media/'
		url = addDomainToUrl(request, value, pattern)
		return url


class HeaderSerializer(serializers.ModelSerializer):
	class Meta:
		model = Category
		fields = ('id', 'slug', 'name', 'cover', 'url')


class SocialsSerializer(serializers.ModelSerializer):
	class Meta:
		model = Socials
		fields = ('id', 'name', 'url',)


class ContactsSerializer(serializers.ModelSerializer):
	socials = SocialsSerializer(source='contacts', many=True)
	class Meta:
		model = Contacts
		fields = '__all__'


class CategorySerializer(serializers.ModelSerializer):
	# adding custom fields
	title = serializers.CharField(write_only=True)
	display_section = serializers.CharField(write_only=True)
	post_type = serializers.CharField(write_only=True)

	def to_representation(self, instance):
		data = super().to_representation(instance)
		data['title'] = instance.name
		data['cover'] = instance.file.url
		data['display_section'] = 'page'
		data['post_type'] = 'category'
		return data

	class Meta:
		model = Category
		fields = ('id', 'slug', 'url', 'cover', 'title', 'excerpt', 'description', 'display_section', 'post_type')


class CategoryListSerializer(serializers.ModelSerializer):
	class Meta:
		model = Category
		fields = ('id', 'slug', 'url', 'name', 'excerpt')


class CategoryDetailSerializer(serializers.ModelSerializer):
	class Meta:
		model = Category
		fields = ('id', 'name', 'url', 'cover', 'file', 'description')


class CustomerSerializer(serializers.ModelSerializer):
	class Meta:
		model = Customer
		fields = '__all__'


class AwardSerializer(serializers.ModelSerializer):
	class Meta:
		model = Award
		fields = '__all__'


class NavItemsSerializer(serializers.ModelSerializer):
	class Meta:
		model = Navbar
		fields = ('link_to', 'slug', 'name', )


class MediaSerializer(serializers.ModelSerializer):
	class Meta:
		model = Media
		fields = '__all__'


class MetaSeoSerializer(serializers.HyperlinkedModelSerializer):
	post_type = serializers.CharField()
	class Meta:
		model = Seo
		fields = ('id', 'post_id', 'post_type', 'title', 'description', 'keywords')


class SeoDetailSerializer(serializers.ModelSerializer):
	class Meta:
		model = Seo
		fields = ('title', 'description', 'keywords')


class PostSerializer(serializers.ModelSerializer):
	#cover = FileFieldSerializer()
	description = FixAbsolutePathSerializer()
	class Meta:
		model = Post
		fields = ('id', 'slug', 'url', 'cover', 'title', 'excerpt', 'description', 'display_section', 'post_type')


class EventListSerializer(serializers.ModelSerializer):
	date = serializers.DateTimeField(format="%d/%m/%Y")
	class Meta:
		model = Event
		fields = ('id', 'slug', 'title', 'excerpt', 'cover', 'date')


class EventPagination(PageNumberPagination):
	page_size = settings.EVENTS_PER_PAGE
	page_query_param = 'page'


class EventDetailSerializer(serializers.ModelSerializer):
	seo = SeoDetailSerializer(source='meta', many=False)
	media = MediaSerializer(many=True)
	cover = serializers.SerializerMethodField()
	date = serializers.DateTimeField(format="%d/%m/%Y %H:%M")
	class Meta:
		model = Event
		fields = ('id', 'title', 'description', 'cover', 'url', 'date', 'location', 'media', 'seo')

	def get_cover(self, obj):
		request =  self.context['request']
		imageUrl = obj.cover.url
		return request.build_absolute_uri(imageUrl)


class PortfolioSerializer(serializers.ModelSerializer):
	portfolio = MediaSerializer(source='media', many=True)
	class Meta:
		model = Portfolio
		fields = ('id', 'slug', 'cover', 'title', 'excerpt', 'description', 'url', 'portfolio')


