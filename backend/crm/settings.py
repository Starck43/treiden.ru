"""
Django settings for crm project.

Generated by 'django-admin startproject' using Django 3.2.3.

For more information on this file, see
https://docs.djangoproject.com/en/3.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.2/ref/settings/
"""

from pathlib import Path
from os import path
import environ

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.2/howto/deployment/checklist/

env = environ.Env()
env.read_env(path.join(BASE_DIR, '.env'))

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = env('SECRET_KEY')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = env.bool('DEBUG', False)

ALLOWED_HOSTS = env('ALLOWED_HOSTS', list, [])

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'corsheaders',
    'ckeditor',
    'ckeditor_uploader',
    'imagekit',
    'projects',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware', # corsheaders
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'debug_toolbar.middleware.DebugToolbarMiddleware', # debug_toolbar
]

API_PAGES_RENDER_HOOK = env('API_BUILD_HOOK')

CORS_ALLOW_ALL_ORIGINS = True

CORS_URLS_REGEX = r'^/api/.*$'

#CORS_ALLOWED_ORIGINS = []

CORS_ALLOW_METHODS = ['GET']


INTERNAL_IPS = [
    'localhost',
]

ROOT_URLCONF = 'crm.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'crm.wsgi.application'


# Database
# https://docs.djangoproject.com/en/3.2/ref/settings/#databases


DATABASES = {
    'default': env.db()
    # 'default': {
    #     'ENGINE': 'django.db.backends.sqlite3',
    #     'NAME': BASE_DIR / 'db.sqlite3',
    # }
}

CACHES = {
    'default': {'BACKEND': 'django.core.cache.backends.dummy.DummyCache',}
}


# Password validation
# https://docs.djangoproject.com/en/3.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


REST_FRAMEWORK = {
    # Use Django's standard `django.contrib.auth` permissions,
    # or allow read-only access for unauthenticated users.
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.DjangoModelPermissionsOrAnonReadOnly'
    ]
}


FILE_UPLOAD_MAX_MEMORY_SIZE = 26214400
FILE_UPLOAD_PERMISSIONS = 0o775

# thumbnail settings
THUMBNAIL_QUALITY = 80
THUMBNAIL_UPSCALE = False
THUMBNAIL_FILTER_WIDTH = 600

ADMIN_THUMBNAIL_QUALITY = 75
ADMIN_THUMBNAIL_SIZE = [100, 100]

DJANGORESIZED_DEFAULT_QUALITY = 85
DJANGORESIZED_DEFAULT_SIZE = [1500, 1024]
DJANGORESIZED_DEFAULT_KEEP_META = False


CKEDITOR_UPLOAD_PATH = 'uploads/'
CKEDITOR_IMAGE_BACKEND = 'pillow'
AWS_QUERYSTRING_AUTH = False

CKEDITOR_CONFIGS = {
    'default': {
        #'skin': 'moono',
        'toolbar': [
            {'name': 'styles', 'items': ['Styles', 'Format', 'Font', 'FontSize']},
            {'name': 'basicstyles', 'items': ['Bold', 'Italic', 'Underline', 'Strike', 'Superscript', '-', 'RemoveFormat']},
            {'name': 'colors', 'items': ['TextColor', 'BGColor']},
            {'name': 'paragraph', 'items': ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', '-',
                'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-',]},
            {'name': 'tools', 'items': ['Image', 'Video', 'Link', 'Youtube', 'Maximize', 'ShowBlocks','Undo', 'Redo',]},
        ],
        'font_names': 'Cuprum;Alegreya Sans;Corbel;Calibri;Arial;Tahoma;Sans serif;Helvetica;Symbol',
        'width': '100%',
        'height': 300,
        'tabSpaces': 4,
        #'uiColor': '#DDD',
        'config.extraPlugins' : 'youtube',
        #'image2_alignClasses': ['image-align-left', 'image-align-center', 'image-align-right'],
        'extraAllowedContent': 'iframe[*]',
        'toolbarCanCollapse': True,
    },
}

SOCIALS = ["vk", "instagram"]

EVENTS_PER_PAGE = 2
# Internationalization
# https://docs.djangoproject.com/en/3.2/topics/i18n/

LANGUAGE_CODE = 'ru-RU'

TIME_ZONE = 'Europe/Moscow'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.2/howto/static-files/

STATIC_URL = '/static/'

# Base url to serve media files
MEDIA_URL = '/media/'

PUBLIC_ROOT = env('PUBLIC_ROOT', default='')

STATIC_ROOT = path.join(BASE_DIR, PUBLIC_ROOT + 'static/')
STATICFILES_DIRS = [
    path.join(BASE_DIR, PUBLIC_ROOT + 'assets/'),
]

MEDIA_ROOT = path.join(BASE_DIR, PUBLIC_ROOT + 'media/')


DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
