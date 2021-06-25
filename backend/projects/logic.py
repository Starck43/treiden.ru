import re
from django.conf import settings
from django.http import HttpResponse
from django.core.cache import cache
from django.core.cache.utils import make_template_fragment_key
from django.utils.html import format_html
from django.core.files.storage import FileSystemStorage
from os import path, remove

from imagekit import ImageSpec
from imagekit.processors import ResizeToFit #, ResizeToFill
from imagekit.cachefiles import ImageCacheFile


def remove_file(obj):
	""" param <path> could either be relative or absolute. """
	#print(obj.path)
	if path.isfile(obj.path) or path.islink(obj.path):
		remove(obj.path)  # remove the file


def is_file_exist(obj):
	return path.isfile(path.join(settings.MEDIA_ROOT,obj.name))


def is_image_file(obj):
	filename, ext = path.splitext(obj.file.name)
	return ext.lower() == '.jpg' or ext.lower() == '.jpeg' or ext.lower() == '.png'


class MediaFileStorage(FileSystemStorage):

	def save(self, name, content, max_length=None):
		#return super().save(name, content, max_length)
		if not self.exists(name):
			return super().save(name, content, max_length)
		else:
			# prevent saving file on disk
			return name


class AdminThumbnail(ImageSpec):
	processors = [ResizeToFit(100, 100)]
	format = 'JPEG'
	options = {'quality': 75 }


class GalleryThumbnail(ImageSpec):
	processors = [ResizeToFit(1200, 800)]
	format = 'JPEG'
	autoconvert = True
	options = {'quality': 80 }


class Thumbnail(ImageSpec):
	processors = [ResizeToFit(900, 600)]
	format = 'JPEG'
	autoconvert = True
	options = {'quality': 80 }


def get_admin_thumb(obj):
	if obj and is_file_exist(obj) and is_image_file(obj) :
		thumb = ImageCacheFile(AdminThumbnail(obj))
		thumb.generate()
		return format_html('<img src="{0}" width="100"/>', thumb.url)
	else:
		return format_html('<img src="/media/no-image.jpg" width="100"/>')


def resize_image(obj, thumbnail='thumbnail', *sizes):
	print(obj)
	if obj and is_image_file(obj) :
		try:
			file = obj.path
			source = open(file, 'rb')
			if thumbnail == 'full':
				image_generator = GalleryThumbnail(source=source)
			else:
				image_generator = Thumbnail(source=source)
			result = image_generator.generate()
			dest = open(file, 'wb')
			dest.write(result.read())
			dest.close()

			for size in sizes:
				print(size)
		except IOError:
			return HttpResponse('Ошибка открытия файла %s!' % file)


def update_google_sitemap():
	try:
		ping_google() #сообщим Google о изменениях в sitemap.xml
	except Exception:
		pass

def addDomainToUrl(request, value, pattern, start=False):
	scheme = request.is_secure() and "https" or "http"
	SITE_DOMAIN = '%s://%s' % (scheme, request.META['HTTP_HOST'])
	SEARCH_PATTERN = pattern.replace('<URL>', '')
	REPLACE_WITH = pattern.replace('<URL>', SITE_DOMAIN)
	to_replace = value.startswith(SEARCH_PATTERN) if start else True
	if to_replace:
		url = value.replace(SEARCH_PATTERN, REPLACE_WITH)

	return url
