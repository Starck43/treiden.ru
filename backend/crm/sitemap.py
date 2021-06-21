from django.contrib.sitemaps import Sitemap
from django.shortcuts import reverse

from projects.models import Category


class StaticViewSitemap(Sitemap):
	priority = 0.5          # Приоритет
	changefreq = 'daily'   # Частота проверки

	def items(self):
		return [
			'index',
			# 'contacts-url',
			# 'projects:category-list-url',
		]

	def location(self, item):
		return reverse(item)


class CategorySitemap(Sitemap):
	priority = 1
	changefreq = 'daily'
	def items(self):
		return Category.objects.all()

sitemaps = {
	'static': StaticViewSitemap,
	'category': CategorySitemap,
}

