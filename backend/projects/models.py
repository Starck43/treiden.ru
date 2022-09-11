from django.db import models
from django.db.models import Q, F
from django.db.models.functions import Coalesce
from django.utils.html import format_html
from django.contrib.auth.models import User #, UserManager
from django.core.validators import RegexValidator

import os
import datetime

from uuslug import uuslug
from ckeditor_uploader.fields import RichTextUploadingField
from imagekit.models import ProcessedImageField
from imagekit.processors import ResizeToFit, ResizeToFill

from .logic import MediaFileStorage, get_admin_thumb, is_file_exist, generate_images, generate_thumbs, remove_images


class SearchManager(models.Manager):

	def search(self, search_query, fields, **kwargs):
		extra_query = Q()
		for key, value in kwargs.items():
			query = Q(**{ f'{key}': value })
			extra_query.add(query, Q.AND)

		if search_query and fields:
			params = search_query.split()
			or_lookup = None
			for field in fields:
				and_lookup = None
				for param in params:
					query = Q(**{ f'{field}__icontains': param })
					if not and_lookup:
						and_lookup = query
					else:
						and_lookup.add(query, Q.AND) # for searching words

				if not or_lookup:
					or_lookup = and_lookup
				else:
					or_lookup.add(and_lookup, Q.OR) # for searching fields
			return self.get_queryset().filter(or_lookup, extra_query).distinct()
		return None


class Navbar(models.Model):
	CHOICES = (
		('page', 'Cтраница'), #default link_to
		('index_page', 'Секция на главной странице'),
		('header', 'Шапка'),
		('footer', 'Подвал'),
	)
	name = models.CharField('Название раздела', max_length=20, help_text='Введите название элемента меню')
	slug = models.SlugField('Ссылка', max_length=20, blank=True, unique=True, help_text='Укажите латинскими буквами ярлык меню')
	sort = models.PositiveSmallIntegerField('Индекс сортировки')
	link_to = models.CharField('Область навигации', max_length=10, choices=CHOICES, default=CHOICES[0][0], blank=True, help_text='Укажите область вывода контента')
	is_active = models.BooleanField('Показывать в меню', default=True)

	class Meta:
		db_table = "nav_items"
		ordering = ['sort']
		verbose_name = 'раздел сайта'
		verbose_name_plural = 'Разделы сайта'

	def save(self, *args, **kwargs):
		if not self.slug:
			self.slug = uuslug(self.name, instance=self)
		super().save(*args, **kwargs)

	def __str__(self):
		return self.name


class Category(models.Model):
	name = models.CharField('Название категории', max_length=50, unique=True, help_text='')
	excerpt = models.TextField('Краткая информация', null=True, blank=True, help_text='Краткое описание для вывода в разделе на главной странице')
	description = RichTextUploadingField('Контент', null=True, blank=True)
	slug = models.SlugField('Ярлык', max_length=50, unique=True, help_text='Имя раздела (лат.) для использования в качестве внутренней ссылки для перехода на страницу Портфолио')
	url = models.URLField('Внешняя ссылка', null=True, blank=True, help_text='Ссылка на видео youtube или для перехода на указанную страницу')
	cover = ProcessedImageField(upload_to='cover/',
		processors=[ResizeToFill(1920, 1080)],
		format='JPEG',
		options={'quality': 80},
		storage=MediaFileStorage(),
		verbose_name='Обложка',
		help_text='Фото раздела для баннера на главной странице. Размер 1920х1080')
	file = ProcessedImageField(upload_to='uploads/',
		processors=[ResizeToFill(900, 600)],
		format='JPEG',
		options={'quality': 80},
		storage=MediaFileStorage(),
		null=True, blank=True,
		verbose_name='Фото',
		help_text='Фото для вывода в секции описания с размером 450х300')
	seo_title = models.CharField('Заголовок страницы', max_length=100, blank=True)
	seo_description = models.TextField('Мета описание', max_length=150, blank=True, help_text='Описание записи в поисковой выдаче. Рекомендуется 70-80 символов')
	seo_keywords = models.CharField('Ключевые слова', max_length=255, blank=True, help_text='Укажите через запятую поисковые словосочетания, которые присутствуют в заголовке или описании самой записи. Рекомендуется до 20 слов и не более 3-х повторов')

	objects = SearchManager()

	class Meta:
		db_table = "categories"
		ordering = ['name']
		verbose_name = 'категория'
		verbose_name_plural = 'Категории'


	def __init__(self, *args, **kwargs):
		super().__init__(*args, **kwargs)
		self.original_file = self.file
		self.original_cover = self.cover
		if not self.seo_title:
			self.seo_title = self.name

		if not self.seo_description:
			self.seo_description = self.excerpt


	def delete(self, *args, **kwargs):
		super().delete(*args, **kwargs)
		remove_images(self.file)
		remove_images(self.cover)


	def save(self, *args, **kwargs):
		# delete an old image before saving a new one
		if self.original_file and self.file != self.original_file:
			remove_images(self.original_file)
			self.original_file = None

		# delete an old image before saving a new one
		if self.original_cover and self.cover != self.original_cover:
			remove_images(self.original_cover)
			self.original_cover = None

		super().save(*args, **kwargs)

		if self.file != self.original_file:
			generate_thumbs(self.file, [450, 900])

		if self.cover != self.original_cover:
			generate_thumbs(self.cover, [320, 450, 640, 768, 1080, 1200, 1920])

		self.original_cover = self.cover
		self.original_file = self.file

	def __str__(self):
		return self.name

	def thumb(self):
		return get_admin_thumb(self.cover)
	thumb.short_description = 'Обложка'



class Post(models.Model):
	CHOICES = (
		('H', 'в шапке'),
		('F', 'в подвале'),
		('HF', 'в шапке и подвале'),
	)

	title = models.CharField('Заголовок', max_length=100, help_text='')
	excerpt = models.TextField('Краткая информация', null=True, blank=True, help_text='Указывается, если необходимо вывести краткую информацию вместо всего контента на главной странице')
	description = RichTextUploadingField('Контент', null=True, blank=True, help_text='Полный контент для вывода в выбранном разделе сайта или секции')
	slug = models.SlugField('Ярлык', max_length=100, null=True, blank=True, unique=True, help_text='Название записи латинскими буквами')
	cover = ProcessedImageField(
		upload_to='cover/',
		processors=[ResizeToFit(1200, 900, upscale=False)],
		format='JPEG',
		options={'quality': 80},
		storage=MediaFileStorage(),
		verbose_name='Обложка',
		null=True, help_text='Обложка для фотогалереи проектов и ивентов')

	# display_section и extra_display_section для наследующих моделей (Portfolio, Event) скрывать!!!
	display_section = models.ForeignKey(Navbar, on_delete=models.SET_NULL, null=True, blank=True, related_name='posts', verbose_name = 'Раздел', help_text='Выберите раздел для отображения контента')
	extra_display_section = models.CharField('Секция', choices=CHOICES, max_length=2, null=True, blank=True, help_text='Выберите нужную секцию для вывода записи')
	url = models.URLField('УРЛ ссылка', null=True, blank=True, help_text='Укажите внешнюю ссылку на медифайл или адрес сайта с контентом')
	is_active = models.BooleanField('Показывать', default=True)
	# editor скрыть в админке и сохранять там текущего пользователя
	editor = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, verbose_name = 'Автор')
	modified_date = models.DateField('Дата изменения', auto_now_add=True)
	post_type = models.CharField('Тип записи', max_length=50, null=True, blank=True, editable=False)

	objects = SearchManager()

	class Meta:
		ordering = ['title']
		verbose_name = 'запись'
		verbose_name_plural = 'Записи'


	def __init__(self, *args, **kwargs):
		super().__init__(*args, **kwargs)
		self.original_cover = self.cover


	def delete(self, *args, **kwargs):
		super().delete(*args, **kwargs)
		remove_images(self.cover)


	def save(self, *args, **kwargs):
		if not self.slug:
			self.slug = uuslug(self.title.lower(), instance=self)

		if not self.post_type:
			self.post_type = self._meta.model_name

		# delete an old image before saving a new one
		if self.original_cover and self.cover != self.original_cover:
			remove_images(self.original_cover)
			self.original_cover = None

		super().save(*args, **kwargs)

		if self.cover != self.original_cover:
			generate_thumbs(self.cover, [320, 450, 640, 768, 1080, 1200])

		self.original_cover = self.cover


	def __str__(self):
		return self.title

	def thumb(self):
		return get_admin_thumb(self.cover)
	thumb.short_description = 'Обложка'



class Event(Post):
	date = models.DateTimeField('Дата и время', help_text='Укажите дату и время проведения мероприятия')
	location = models.CharField('Место проведения', max_length=250, blank=True, help_text='Укажите место проведения мероприятия')

	class Meta:
		db_table = "events"
		ordering = ['-date']
		verbose_name = 'Событие'
		verbose_name_plural = 'Ивенты'

	def save(self, *args, **kwargs):
		if not self.slug:
			self.slug = 'event-'+uuslug(str(self.id), instance=self)

		# set type 'event' for building link in search result
		self.post_type = self._meta.model_name
		super().save(*args, **kwargs)



class Portfolio(Post):
	category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, verbose_name = 'Категория')
	sort = models.PositiveSmallIntegerField('Индекс сортировки', null=True, blank=True)

	class Meta:
		db_table = "portfolio"
		ordering = [Coalesce("sort", F('id') + 500)]
		verbose_name = 'Проект'
		verbose_name_plural = 'Проекты'

	def save(self, *args, **kwargs):
		if not self.slug:
			self.slug = 'project-'+uuslug(str(self.id), instance=self)

		# set type category's slug for building link in search result
		self.post_type = self.category.slug
		super().save(*args, **kwargs)



class Media(models.Model):
	post = models.ForeignKey(Post, on_delete=models.SET_NULL, null=True, blank=True, related_name='media', verbose_name = 'Запись', help_text='Укажите запись, к которой принадлежит медиафайл')
	title = models.CharField('Заголовок', max_length=100, blank=True, help_text='')
	file = ProcessedImageField(
		upload_to='gallery/',
		processors=[ResizeToFit(1200, 900, upscale=False)],
		format='JPEG',
		options={'quality': 80},
		storage=MediaFileStorage(),
		verbose_name='Медиафайл',
		help_text='Выберите фото для отображения в галерее портфолио или ивента'
		)
	alt = models.TextField('Описание', max_length=250, blank=True, help_text='Краткое описание медиафайла для поисковых систем')

	class Meta:
		db_table = "media"
		#ordering = ['']
		verbose_name = 'медиафайл'
		verbose_name_plural = 'Медиафайлы'


	def __init__(self, *args, **kwargs):
		super().__init__(*args, **kwargs)
		self.original_file = self.file


	def delete(self, *args, **kwargs):
		super().delete(*args, **kwargs)
		remove_images(self.file)


	def save(self, *args, **kwargs):
		# delete an old image before saving a new one
		if self.original_file and self.file != self.original_file:
			remove_images(self.original_file)
			self.original_file = None

		super().save(*args, **kwargs)

		if self.file != self.original_file:
			generate_images(self.file, 'full', [320, 450, 640, 768, 1080, 1200])

		self.original_file = self.file


	def __str__(self):
		return self.title

	def filename(self):
		return self.file.name.rsplit('/', 1)[-1]
	filename.short_description = 'Имя файла'

	def thumb(self):
		return get_admin_thumb(self.file)
	thumb.short_description = 'Фото'



class Customer(models.Model):
	title = models.CharField('Заголовок', max_length=100, unique=True, help_text='Укажите организацию или частное лицо в качестве заголовка')
	subtitle = models.CharField('Подзаголовок', max_length=255, blank=True, help_text='Здесь можно указать должность и ФИО заказчика')
	avatar = ProcessedImageField(
		upload_to='avatar/',
		processors=[ResizeToFill(900, 900)],
		format='JPEG',
		options={'quality': 80},
		storage=MediaFileStorage(),
		verbose_name='Аватар',
		help_text='Фото клиента размером 900х900 пикселей')
	review = RichTextUploadingField('Отзыв', blank=True)
	url = models.URLField('Видеоотзыв', blank=True, help_text='Внешняя ссылка на видеоотзыв')

	objects = SearchManager()

	class Meta:
		db_table = "customers"
		ordering = ['title']
		verbose_name = 'заказчик'
		verbose_name_plural = 'Заказчики'


	def __init__(self, *args, **kwargs):
		super().__init__(*args, **kwargs)
		self.original_avatar = self.avatar


	def delete(self, *args, **kwargs):
		super().delete(*args, **kwargs)
		remove_images(self.avatar)


	def save(self, *args, **kwargs):
		# delete an old image before saving a new one
		if self.original_avatar and self.avatar != self.original_avatar:
			remove_images(self.original_avatar)
			self.original_avatar = None

		super().save(*args, **kwargs)

		if self.avatar != self.original_avatar:
			generate_thumbs(self.avatar, [160, 320, 450, 640, 900])

		self.original_avatar = self.avatar


	def __str__(self):
		return self.title

	def thumb(self):
		return get_admin_thumb(self.avatar)
	thumb.short_description = 'Аватар'



class Award(models.Model):
	def year_choices():
		return [(r,r) for r in range(2000, datetime.date.today().year)]

	title = models.CharField('Название категории', max_length=150, unique=True, help_text='')
	description = models.TextField('Описание', blank=True)
	file = ProcessedImageField(
		upload_to='awards/',
		processors=[ResizeToFit(640, 900, upscale=False)],
		format='JPEG',
		options={'quality': 80},
		storage=MediaFileStorage(),
		verbose_name='Фото',
		help_text='Выберите фото в портретном формате')
	year = models.IntegerField('Год вручения', choices=year_choices())

	class Meta:
		db_table = "awards"
		ordering = ['-year']
		verbose_name = 'награда'
		verbose_name_plural = 'Награды'


	def __init__(self, *args, **kwargs):
		super().__init__(*args, **kwargs)
		self.original_file = self.file


	def delete(self, *args, **kwargs):
		super().delete(*args, **kwargs)
		remove_images(self.file)


	def save(self, *args, **kwargs):
		# delete an old image before saving a new one
		if self.original_file and self.file != self.original_file:
			remove_images(self.original_file)
			self.original_file = None

		super().save(*args, **kwargs)

		if self.file != self.original_file:
			generate_thumbs(self.file, [160, 320, 450, 640])

		self.original_file = self.file


	def __str__(self):
		return self.title

	def thumb(self):
		return get_admin_thumb(self.file)
	thumb.short_description = 'Фото'


class Seo(models.Model):
	post = models.OneToOneField(Post, on_delete=models.CASCADE, null=True, blank=True, related_name='meta', verbose_name = 'Запись', help_text='Запись, к которой принадлежит СЕО описание')
	title = models.CharField('Заголовок страницы', max_length=100, blank=True)
	description = models.TextField('Мета описание', max_length=150, blank=True, help_text='Описание записи в поисковой выдаче. Рекомендуется 70-80 символов')
	keywords = models.CharField('Ключевые слова', max_length=255, blank=True, help_text='Укажите через запятую поисковые словосочетания, которые присутствуют в заголовке или описании самой записи. Рекомендуется до 20 слов и не более 3-х повторов')

	class Meta:
		db_table = 'seo'
		verbose_name = 'СЕО'
		verbose_name_plural = 'СЕО'

	def __str__(self):
		return self.title


class Contacts(models.Model):
	phone_regex = RegexValidator(regex=r'^\+?1?\d{9,15}$', message="Введите номер в формате: '+7XXXXXXXXXX'")

	name = models.CharField('Название', max_length=150, unique=True, help_text='Укажите название своей компании')
	phone = models.CharField('Телефон', validators=[phone_regex], max_length=12, blank=True, default="")
	email = models.EmailField('E-mail', max_length=50, blank=True, default="")
	add_contact = models.CharField('Дополнительный контакт', max_length=250, blank=True, help_text='Поле для дополнительного телефона или e-mail и контактного лица')
	address = models.CharField('Адрес расположения', max_length=100, blank=True)
	file = ProcessedImageField(
		upload_to='uploads/',
		processors=[ResizeToFill(640, 360)],
		format='JPEG',
		options={'quality': 80},
		storage=MediaFileStorage(),
		verbose_name='Карта',
		blank=True, help_text='Укажите фото карты местности размером 640x360 пикселей')

	class Meta:
		db_table = "contacts"
		#unique_together = ['name', 'phone']
		verbose_name = 'контакт'
		verbose_name_plural = 'Контакты'


	def __init__(self, *args, **kwargs):
		super().__init__(*args, **kwargs)
		self.original_file = self.file


	def delete(self, *args, **kwargs):
		super().delete(*args, **kwargs)
		remove_images(self.file)


	def save(self, *args, **kwargs):
		# if update image
		if self.file and self.original_file and self.file.file != self.file.path:
			generate_images(self.file)

		if not self.file and self.original_file:
			remove_images(self.original_file)

		super().save(*args, **kwargs)
		if self.file:
			generate_thumbs(self.file, [160, 320, 640])
		self.original_file = self.file


	def __str__(self):
		return self.name


class Socials(models.Model):
	contact = models.ForeignKey(Contacts, on_delete=models.SET_NULL, related_name='contacts', null=True, blank=True, verbose_name = 'Контакт', help_text='Выберите контакт для отображения текущей социальной сети')
	name = models.CharField('Название', max_length=100, blank=True, help_text='Укажите название на английском языке')
	url = models.URLField('Ссылка на сайт', blank=True, help_text='Интернет адрес социальной сети')
	sort = models.PositiveSmallIntegerField('Индекс сортировки', null=True, blank=True)

	class Meta:
		db_table = "socials"
		ordering = [Coalesce("sort", F('id') + 500)]
		verbose_name = 'социальная сеть'
		verbose_name_plural = 'Социальные сети'

	def __str__(self):
		return self.name



