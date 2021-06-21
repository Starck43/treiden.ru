from django.forms import ModelForm, Select
from django.db.models import Q

from .models import Post, Portfolio, Event, Seo

class SeoForm(ModelForm):
	def __init__(self, *args, **kwargs):
		super().__init__(*args, **kwargs)
		#query_list = Post.objects.filter(Q(portfolio__isnull=False) | Q(event__isnull=False))
		query_portfolio = Portfolio.objects.all()
		query_events = Event.objects.all()
		#CHOICES = [(None,'Главная страница')] + list((x.id, x.title) for x in query_list )
		CHOICES = [[None,'Главная страница']] + list((x.id, 'Проект: '+x.title) for x in query_portfolio) + list((x.id, 'Ивент: '+x.title) for x in query_events)
		self.fields['post'].widget = Select(choices=CHOICES)
	class Meta:
		model = Seo
		fields = '__all__'

