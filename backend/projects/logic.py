import re
from django.conf import settings
from django.http import HttpResponse
from django.core.cache import cache
from django.core.cache.utils import make_template_fragment_key
from django.utils.html import format_html
from django.core.files.storage import FileSystemStorage

from uuslug import slugify, uuslug
from os import path, remove, rename
from glob import glob
from shutil import rmtree
from PIL import Image
from imagekit import ImageSpec
from imagekit.processors import ResizeToFit #, ResizeToFill
from imagekit.cachefiles import ImageCacheFile


# delete main image and its thumbs
def remove_images(obj, delete_original=True):
	if obj and obj.path:
		filename, ext = path.splitext(obj.path)
		cache_folder = filename.replace('/media/', '/media/CACHE/images/')
		rmtree(cache_folder, ignore_errors=True)
		# select all thumbs for original file
		files = glob(filename+'_[0-9][0-9][0-9]*w'+ext)
		# add to files array if original file exists on disk
		if delete_original and (path.isfile(obj.path) or path.islink(obj.path)):
			files.append(obj.path)
		for f in files:
			remove(f)


def is_file_exist(obj):
	#return path.isfile(path.join(settings.MEDIA_ROOT,obj.name))
	return path.isfile(obj.path)


def is_image_file(obj):
	filename, ext = path.splitext(obj.file.name)
	return ext.lower() == '.jpg' or ext.lower() == '.jpeg' or ext.lower() == '.png'


class MediaFileStorage(FileSystemStorage):

	def get_available_name(self, name, max_length=None):
		upload_folder, filename = path.split(name.lower())
		filename, ext = path.splitext(filename)
		filename = slugify(filename)
		name = path.join(upload_folder, filename+ext)

		# add index to file name if it exists
		index=1
		while self.exists(name):
			name = path.join(upload_folder, f'{filename}-{index:02}'+ext)
			index += 1
			if index == 20:
				break

		return name



class AdminThumbnail(ImageSpec):
	processors = [ResizeToFit(100, 100)]
	format = 'JPEG'
	options = {'quality': 75 }


class GalleryThumbnail(ImageSpec):
	processors = [ResizeToFit(1200, 900)]
	format = 'JPEG'
	autoconvert = True
	options = {'quality': 80 }


class Thumbnail(ImageSpec):
	processors = [ResizeToFit(900, 600)]
	format = 'JPEG'
	autoconvert = True
	options = {'quality': 80 }


def update_admin_thumb(obj):
	thumbnail = ImageCacheFile(AdminThumbnail(obj))
	#print(thumbnail)
	thumbnail.generate()
	return thumbnail


def get_admin_thumb(obj):
	if obj and is_file_exist(obj) and is_image_file(obj) :
		thumb = update_admin_thumb(obj)
		#print(f'get admin thumb {thumb.url}')
		if thumb.url:
			return format_html('<img src="{0}" width="100"/>', thumb.url)
	return format_html('<img src="/media/no-image.jpg" width="100"/>')


def generate_thumbs(obj, sizes):
	if obj and is_file_exist(obj) and is_image_file(obj) :
		file = obj.path
		filename, ext = path.splitext(file)
		with Image.open(file) as image:
			im_w, im_h = image.size
			aspect_ratio = im_w / float(im_h)

			for size in sizes:
				im = image.copy()
				thumb_w = size
				thumb_h = int(thumb_w / aspect_ratio)
				im.thumbnail((thumb_w, thumb_h))
				thumb_filename = '{0}_{1}w{2}'.format(filename, size, ext)
				im.save(thumb_filename)


def generate_images(obj, thumbnail='thumbnail', *sizes):
	if obj and is_image_file(obj) :
		file = obj.path
		old_file = file + '.old'
		try:
			source = open(file, 'rb')
			if thumbnail == 'full':
				image_generator = GalleryThumbnail(source=source)
			else:
				image_generator = Thumbnail(source=source)

			result = image_generator.generate()
			rename(file, old_file)

			dest = open(file, 'wb')
			dest.write(result.read())
			dest.close()
			remove(old_file)

			if sizes :
				generate_thumbs(obj, *sizes)
			
		except IOError:
			print('error in file: %s' % file)
			if path.isfile(old_file):
				rename(old_file, file)
			return HttpResponse('Ошибка открытия файла %s!' % file)


def update_google_sitemap():
	try:
		ping_google() #сообщим Google о изменениях в sitemap.xml
	except Exception:
		pass

def addDomainToUrl(request, value, pattern, start=False):
	if request:
		scheme = request.is_secure() and "https" or "http"
		SITE_DOMAIN = '%s://%s' % (scheme, request.META['HTTP_HOST'])
		SEARCH_PATTERN = pattern.replace('<URL>', '')
		REPLACE_WITH = pattern.replace('<URL>', SITE_DOMAIN)
		to_replace = value.startswith(SEARCH_PATTERN) if start else True
		if to_replace:
			url = value.replace(SEARCH_PATTERN, REPLACE_WITH)

		return url
	return value

def get_site_domain(url):
	if not url:
		return ""
	name = re.sub(r'^https?:\/\/|\/(www\.)?$', '', url, flags=re.MULTILINE)
	return name.strip().strip('/').split('.', 1)[0]
