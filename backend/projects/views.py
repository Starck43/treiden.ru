# views.py
from urllib import parse
from django.conf import settings
from django.db.models import Q, F

from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework import views, viewsets, generics, permissions #, filters
from rest_framework.decorators import api_view, permission_classes, action
# from django.contrib.auth.models import User

from .models import *
from .serializers import *

class HeaderView(viewsets.ModelViewSet):
	queryset = Category.objects.all()
	serializer_class = HeaderSerializer
	#lookup_field = 'slug'


class ContactsView(viewsets.ModelViewSet):
	queryset = Contacts.objects.all()
	serializer_class = ContactsSerializer


class CategoryView(viewsets.ModelViewSet):
	queryset = Category.objects.all()
	serializer_class = CategoryListSerializer
	lookup_field = 'slug'
	def retrieve(self, request, *args, **kwargs):
		self.serializer_class = CategoryDetailSerializer
		return super().retrieve(request, *args, **kwargs)


class EventView(viewsets.ModelViewSet):
	queryset = Event.objects.all()
	serializer_class = EventListSerializer
	def list(self, request, *args, **kwargs):
		if request.GET.get('page',None):
			self.pagination_class = EventPagination

		return super().list(request, *args, **kwargs)

	def retrieve(self, request, *args, **kwargs):
		instance = self.get_object()
		serializer = EventDetailSerializer(instance, context={'request': request})
		data = serializer.data
		try:
			next_event = instance.get_next_by_date()
			data.update({'next': {'id': next_event.id, 'title': next_event.title}})
		except:
			next_event = None
			data.update({'next': {}})

		try:
			previous_event = instance.get_previous_by_date()
			data.update({'prev': {'id': previous_event.id, 'title': previous_event.title}})
		except:
			previous_event = None
			data.update({'prev': {}})

		return Response(data)


class CustomerView(viewsets.ModelViewSet):
	queryset = Customer.objects.all()
	serializer_class = CustomerSerializer


class AwardView(viewsets.ModelViewSet):
	queryset = Award.objects.all()
	serializer_class = AwardSerializer


class NavItemsView(viewsets.ModelViewSet):
	queryset = Navbar.objects.filter(is_active=True).order_by('sort')
	serializer_class = NavItemsSerializer
	lookup_field = 'slug'

	def retrieve(self, request, *args, **kwargs):
		instance = self.get_object()
		posts = instance.posts.filter(is_active=True)
		serializer = PostSerializer(posts, many=True, context={'request': request})

		return Response(serializer.data)

class PostExtraView(viewsets.ModelViewSet):
	queryset = Post.objects.filter(is_active=True, extra_display_section__isnull=False)
	serializer_class = PostSerializer


class PostView(viewsets.ModelViewSet):
	queryset = Post.objects.filter(is_active=True)
	serializer_class = PostSerializer


class ProjectListView(generics.ListAPIView):
	queryset = Portfolio.objects.filter(is_active=True)
	serializer_class = PortfolioSerializer


class PortfolioView(viewsets.ModelViewSet):
	serializer_class = PortfolioSerializer
	# lookup_field = 'category__slug'
	# lookup_url_kwarg = 'category'
	def get_queryset(self):
		queryset = Portfolio.objects.filter(is_active=True, category__slug=self.kwargs['category'])
		return queryset


class MetaSeoView(generics.ListAPIView):
	serializer_class = MetaSeoSerializer
	permission_classes = [permissions.AllowAny]

	def get_queryset(self):
		post_id = self.kwargs['post_id'] or None
		post_type = self.kwargs['post_type'] or None
		query = Q(post__post_type__isnull=True) if post_type == 'homepage' else Q(post__post_type=post_type)
		if post_id:
			query.add(Q(post_id=post_id), Q.AND)
		queryset = Seo.objects.filter(query).annotate(post_type=F('post__post_type'))
		return queryset


@api_view(('GET',))
@permission_classes((permissions.AllowAny,))
def SearchListView(request):
	search_result = []
	query = request.GET.get('q', None)

	if query:
		query = parse.unquote(query) #decoding query string

		post_queryset = Post.objects.search(query, ['title' , 'excerpt', 'description'], is_active=True)
		post_search_result = PostSerializer(post_queryset, many=True).data

		category_queryset = Category.objects.search(query, ['name' , 'excerpt', 'description'])
		category_search_result = CategorySerializer(category_queryset, many=True).data

		return Response(post_search_result+category_search_result)

