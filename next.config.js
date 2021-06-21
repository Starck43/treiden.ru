// next.config.js

const path = require('path')

module.exports = {
	env: {
		SERVER: 'http://localhost:9000',
		API_SERVER: 'http://localhost:9000/api/',
	},
	//basePath: '/istarck.ru',
	publicRuntimeConfig: {
		logo: '/images/logo.png',
		map: '/images/map.jpg',
		bgImage: '/images/bg-space.jpg',
		meta: {
			title: 'Трейден Медиа Групп',
			description: 'Рекламные услуги',
			keywords: "рекламные услуги, маркетинговые услуги",
		},
		API_SERVER: 'http://localhost:9000/api/',
		API_ENDPOINTS : {
			navbar: '/navbar',
		},
		googleAnalyticsId: 'G-000000000',
	},
	serverRuntimeConfig: {
	// Will only be available on the server side
	//mySecret: 'secret',
	//secondSecret: process.env.SECOND_SECRET, // Pass through env variables
	},
	images: {
		domains: ['localhost:9000'],
		deviceSizes: [320, 450, 640, 768, 1080, 1200, 1920],
	},
	sassOptions: {
		includePaths: [path.join(__dirname, 'styles')],
	},
}
