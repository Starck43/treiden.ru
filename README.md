# treiden.ru

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) with SSR fetching JSON data from server via API.



## Development

Required:
- NodeJS
- React >17
- NextJS >11
- Python >3.8
- Django >3.2



### Install

Clone project from [Github](github.com) and install its dependencies

```bash
git clone https://github.com/Starck43/treiden.ru.git/treiden.ru
cd treiden.ru
# install all project's dependencies
npm update
```

### Project structure

 - `backend/` - API Django project's files
 - `.next/` - generated static files
 - `pages/` - all dynamic site pages
 - `components/` - custom page's components for development
 - `core/` - additional files for development
 - `public/` - all static files (i.e. images, icons, fonts)
 - `styles/` - project SASS styles imported in components for development
 - `next.config.js` - main config file (i.e. SERVER, API SERVER, Logo)


### Frontend (React with Next.js)

Before run server adjust paths for server name, api, images and others in `next.config.js`

To run the local (development) server:

```bash
npm run dev
# or
yarn dev
```

Open site on `http://localhost:3000`

To build on local server run `yarn build` and go to `.next` folder to watch generated static files
To see prerendered site run `yarn start`


### Backend (Python + Django)

- Enter to `backend` folder
- Create `venv` Environment for project and activate it (`python -m venv ./venv`)
- Install Django with dependencies (`pip install -r requirements.txt`)
- Create project (`django-admin startproject crm .`)
- Create main app (`django-admin startapp projects`)
- Make migrations and migrate them to DB
- Make changes in .env file and settings.py
- Collect static and create superuser
- Run server (`python manage.py runserver localhost:9000`)

Open Django admin on `http://localhost:9000/admin`


### API
- `/api/navitems/` - get Navbar Items list
- `/api/section/<slug>/` - get Navbar Item detail
- `/api/header/` - get Header Sliders list
- `/api/posts/extra/` - get Posts list for header and footer output
- `/api/contacts/` - get Contacts list
- `/api/customers/` - get Customers list
- `/api/awards/` - get Awards list
- `/api/activities/` - get Categories list
- `/api/activities/<slug>/` - get Category detail
- `/api/events/` - get Events list
- `/api/event/<id>/` - get Event detail
- `/api/projects/` - get all Portfolio List
- `/api/projects/<category>/` - get Portfolio list for category
- `/api/projects/<category>/<id>` - get Portfolio detail for category
- `/api/metaseo/<post_type>/` - get Meta Seo list
- `/api/metaseo/<post_type>/<post_id>/` - get Meta Seo detail
- `/api/search/` - get Search List



## Production

### Commit and upload to Github

```bash
git add .
git commit -m "Update version"
git push origin master
```

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.



## Remote admin

Create mySQL database account on your hosting provider

Use FTP access to add/remove project's files on server
Admin backend and Virtual Environment are located in `domains/treiden.ru/public_html/vitaly`

Common commands to manage Django project on server:

```bash
# connect to server via ssh
ssh <account-name>@141.8.195.33
# go to subdomain folder
cd domains/treiden.ru/public_html/vitaly
# install Environment as recommend hosting provider (virtualenv or venv) and activate it
source venv/bin/activate
# start project crm in current folder
django-admin startproject crm .
# start app projects
django-admin startapp projects
# copy project's files in their folders and install packages
pip install -r requirements.txt
# !!! Don't forget to make changes in prod.env file and replace remote settings.py with code from dev
# Update Database parameters and Django Secret key in prod.env

# create folder assets
mkdir ./assets
# collect static
python manage.py collectstatic
# make migrations and migrate
python manage.py makemigrations
python manage.py migrate
```

Go to the site [vitaly.treiden.ru/admin](https://vitaly.treiden.ru/admin) for managing content in Django admin



## Additional Packages

Generate fonts with [Fontello](https://fontello.com/)

Generate favicons with [RealFaviconGenerator](https://realfavicongenerator.net/)

To install this package:

If the site is <code>http://www.example.com</code>, you should be able to access a file named <code>http://www.example.com/favicon.ico</code>.
Put the `favicon.ico` file to your `public` directory

*Optional* - Check your favicon with the [favicon checker](https://realfavicongenerator.net/favicon_checker)



## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
