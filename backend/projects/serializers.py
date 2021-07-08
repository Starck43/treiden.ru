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
	link = serializers.CharField(write_only=True)
	post_type = serializers.CharField(write_only=True)

	def to_representation(self, instance):
		data = super().to_representation(instance)
		data['title'] = instance.name
		data['cover'] = instance.file.url if instance.file else None
		data['link'] = 'projects/' + instance.slug
		data['post_type'] = 'category'
		return data

	class Meta:
		model = Category
		fields = ('id', 'slug', 'url', 'cover', 'title', 'excerpt', 'description', 'link', 'post_type')


class CategoryListSerializer(serializers.ModelSerializer):
	class Meta:
		model = Category
		fields = ('id', 'slug', 'url', 'name', 'excerpt')


class CategoryDetailSerializer(serializers.ModelSerializer):
	seo = serializers.SerializerMethodField()
	class Meta:
		model = Category
		fields = ('id', 'name', 'url', 'cover', 'file', 'description', 'seo')

	def get_seo(self, obj):
		request = self.context['request']
		return {
			'title': obj.seo_title,
			'description': obj.seo_description,
			'keywords': obj.seo_keywords,
			'image': request.build_absolute_uri(obj.cover.url) #settings.ALLOWED_HOSTS[0] + obj.cover.url,
		}


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
	link = serializers.SerializerMethodField()
	description = FixAbsolutePathSerializer()

	class Meta:
		model = Post
		fields = ('id', 'slug', 'url', 'cover', 'title', 'excerpt', 'description', 'link', 'post_type', 'extra_display_section')

	def get_link(self, obj):
		#post, event, portfolio
		if obj.post_type == 'post':
			if obj.display_section and obj.display_section.link_to == 'page':
				return f'/{obj.display_section.slug}/{obj.slug}'
			else:
				return f'/#{obj.slug}'

		if obj.post_type == 'event':
			return f'/{obj.post_type}/{obj.id}'

		if obj.post_type:
			return f'/projects/{obj.post_type}/#project-{obj.id}'

		return None


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


