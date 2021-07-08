from django.contrib import admin
from django.db.models import Q

from .forms import SeoForm
from .models import *

# Creating a model's sort function for admin
def get_app_list(self, request):
	ordered_models = [
		('projects', [
			'Category',
			'Portfolio',
			'Event',
			'Post',
			'Media',
			'Customer',
			'Award',
			'Contacts',
			'Socials',
			'Seo',
			'Navbar',
		])
	]
	app_dict = self._build_app_dict(request)

	for app_name, object_list in ordered_models:
		app = app_dict.get(app_name, None)
		if app:
			app['models'].sort(key=lambda x: object_list.index(x['object_name']))
		#yield app

	return sorted(app_dict.values(), key=lambda x: x['name'].lower())

admin.AdminSite.get_app_list = get_app_list



@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
	model = Category

	prepopulated_fields = {"seo_title": ('name',)} # adding name to seo field
	list_display = ('thumb', 'name', 'excerpt',)
	list_display_links = ('thumb', 'name',)


class PostInlineAdmin(admin.StackedInline):
	model = Post
	extra = 0 #new blank record count
	fields = ('title', 'excerpt', 'url', 'description', 'is_active', )
	verbose_name_plural = ""


class MediaInlineAdmin(admin.TabularInline):
	model = Media
	extra = 1 #new blank record count
	show_change_link = True
	fields = ('thumb', 'file', 'title', 'alt',)
	#list_display = ('file_thumb', 'title',)
	readonly_fields = ('thumb', 'filename',)
	list_display_links = ('thumb', 'name',)


class SocialsInlineAdmin(admin.TabularInline):
	model = Socials
	extra = 0 #new blank record count
	#fields = ('name', 'url', 'sort', )


class SeoInlineAdmin(admin.TabularInline):
	model = Seo
	extra = 0 #new blank record count
	fields = ('title', 'description', 'keywords',)


@admin.register(Navbar)
class NavbarAdmin(admin.ModelAdmin):
	model = Navbar

	prepopulated_fields = {'slug': ('name',)} # adding name to slug field
	list_display = ('name', 'slug', 'link_to',)
	list_display_links = ('name', 'slug',)
	inlines = [PostInlineAdmin]


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
	model = Post

	exclude = ('cover', 'editor',)
	list_display = ('title', 'display_section', 'extra_display_section', 'editor_name', 'modified_date', 'is_active',)
	search_fields = ('title',)
	list_filter = ('display_section', 'extra_display_section',)


	prepopulated_fields = {"slug": ('title',)} # adding name to slug field
	inlines = [MediaInlineAdmin]

	def editor_name(self, obj):
		if not obj.editor:
			return None

		if (not obj.editor.first_name) and (not obj.editor.last_name) :
			return obj.editor.username
		else:
			return "%s %s" % (obj.editor.first_name, obj.editor.last_name)
	editor_name.short_description = 'Редактор'

	def get_queryset(self, request):
		if self.model.__name__.lower() == 'post':
			return self.model.objects.filter(Q(portfolio__isnull=True) & Q(event__isnull=True))
		else:
			return super().get_queryset(request)

	def save_model(self, request, obj, form, change):
		obj.editor = request.user
		super().save_model(request, obj, form, change)


@admin.register(Event)
class EventAdmin(PostAdmin):
	model = Event

	exclude = ('editor', 'display_section', 'extra_display_section',)
	list_display = ('thumb', 'title', 'date', 'location', 'editor_name', 'is_active',)
	list_display_links = ('thumb', 'title',)
	list_filter = ('location', 'is_active',)
	date_hierarchy = 'date'
	inlines = [MediaInlineAdmin, SeoInlineAdmin]


@admin.register(Portfolio)
class PortfolioAdmin(PostAdmin):
	model = Portfolio

	exclude = ('editor', 'display_section', 'extra_display_section',)
	list_display = ('thumb', 'title', 'category', 'editor_name', 'modified_date', 'is_active',)
	list_display_links = ('thumb', 'title',)
	list_filter = ('category', 'is_active',)
	ordering = ('-modified_date',)
	inlines = [MediaInlineAdmin, SeoInlineAdmin]


@admin.register(Media)
class MediaAdmin(admin.ModelAdmin):
	model = Media

	list_display = ('thumb', 'filename', 'title', 'post',)
	list_display_links = ('thumb', 'filename', 'title',)


@admin.register(Contacts)
class ContactsAdmin(admin.ModelAdmin):
	model = Contacts

	list_display = ('name', 'phone', 'add_contact', 'address',)
	inlines = [SocialsInlineAdmin]


@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
	model = Customer
	list_display = ('thumb', 'title',)
	list_display_links = ('thumb', 'title',)


@admin.register(Award)
class AwardAdmin(admin.ModelAdmin):
	model = Award
	list_display = ('thumb', 'title', 'description', 'year',)
	list_display_links = ('thumb', 'title',)


@admin.register(Seo)
class SeoAdmin(admin.ModelAdmin):
	form = SeoForm
	model = Seo
	list_display = ('title', 'description', 'keywords',)


admin.site.register(Socials)

