// next.config.js

const path = require('path')

module.exports = {
	env: {
		SERVER: process.env.SERVER_URL,
		API_SERVER: process.env.SERVER_URL + '/api/',
		SEARCH_ENDPOINT: 'search',
	},
	publicRuntimeConfig: {
		logo: '/images/logo.png',
		bgImage: '/images/bg-space.jpg',
		meta: {
			title: 'Трейден Медиа Групп - идеи со знаком качества',
			description: 'Создание рекламных, коммуникационных и ивент-продуктов федерального качества по провинциальной цене',
			keywords: "реклама, медиа, брендинг, видеопродакшн, ивенты, AR, дополненная реальность, маркетинговые услуги, продвижение бренда",
		},
	},
	serverRuntimeConfig: {
	// Will only be available on the server side
	//mySecret: 'secret',
	//secondSecret: process.env.SECOND_SECRET, // Pass through env variables
	},
	// settings for next/images
	images: {
		domains: ['localhost', process.env.SERVER_HOST],
		deviceSizes: [320, 450, 640, 768, 1080, 1200, 1920], // breakpoints
		imageSizes: [320, 450, 640, 900], // breakpoints
	},
	compiler: {
		// ssr and displayName are configured by default
		styledComponents: true,
		relay: {
			// This should match relay.config.js
			src: './',
			artifactDirectory: './__generated__',
			language: 'typescript',
		},
	},
	sassOptions: {
		includePaths: [path.join(__dirname, 'styles')],
	},
}
