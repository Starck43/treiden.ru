// next.config.js

const path = require('path')
const isProduction = process.env.NODE_ENV === "production"
const serverName = isProduction ? 'https://vitaly.treiden.ru' : 'http://localhost:9000'

module.exports = {
	env: {
		SERVER: serverName,
		API_SERVER: serverName + '/api/',
	},
	publicRuntimeConfig: {
		logo: '/images/logo.png',
		bgImage: '/images/bg-space.jpg',
		meta: {
			title: 'Трейден Медиа Групп',
			description: 'Рекламные услуги по продвижению бренда',
			keywords: "рекламные услуги, маркетинговые услуги",
		},
		googleAnalyticsId: 'G-000000000',
	},
	serverRuntimeConfig: {
	// Will only be available on the server side
	//mySecret: 'secret',
	//secondSecret: process.env.SECOND_SECRET, // Pass through env variables
	},
	images: {
		domains: [serverName],
		deviceSizes: [320, 450, 640, 768, 1080, 1200, 1920],
		imageSizes: [320, 450, 640, 900],
	},
	sassOptions: {
		includePaths: [path.join(__dirname, 'styles')],
	},
}
