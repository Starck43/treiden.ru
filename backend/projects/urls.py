from django.urls import path, re_path, include
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
#router.register(r'category-list', views.CategoryView)

app_name = 'projects'

urlpatterns = [
	path('navitems/', views.NavItemsView.as_view({'get': 'list'})),
	path('section/<str:slug>/', views.NavItemsView.as_view({'get': 'retrieve'})),
	path('header/', views.HeaderView.as_view({'get': 'list'})),
	path('posts/extra/', views.PostExtraView.as_view({'get': 'list'})),
	path('contacts/', views.ContactsView.as_view({'get': 'list'})),
	path('customers/', views.CustomerView.as_view({'get': 'list'})),
	path('awards/', views.AwardView.as_view({'get': 'list'})),

	path('activities/', views.CategoryView.as_view({'get': 'list'})),
	path('activities/<str:slug>/', views.CategoryView.as_view({'get': 'retrieve'})),

	path('events/', views.EventView.as_view({'get': 'list'})),
	path('event/<int:pk>/', views.EventView.as_view({'get': 'retrieve'})),

	path('projects/', views.ProjectListView.as_view()),
	path('projects/<str:category>/', views.PortfolioView.as_view({'get': 'list'})),
	path('projects/<str:category>/<int:pk>', views.PortfolioView.as_view({'get': 'retrieve'})),

	path('metaseo/<str:post_type>/', views.MetaSeoView.as_view(), kwargs={'post_id': None}, name='metaseo-list'),
	path('metaseo/<str:post_type>/<int:post_id>/', views.MetaSeoView.as_view(), name='metaseo-detail'),

	path('search/', views.SearchListView),
	#path('api/', include(router.urls)),
	#path('', include('rest_framework.urls', namespace='rest_framework')),
	#path('posts/', views.CategoryView.as_view()), #default url
]
