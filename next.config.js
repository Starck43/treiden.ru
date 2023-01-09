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
	serverRuntimeConfig: {},
	images: {
		domains: ['localhost', process.env.SERVER_HOST],
		deviceSizes: [320, 450, 640, 768, 1080, 1200, 1920], // breakpoints
		imageSizes: [320, 450, 640, 900], // breakpoints
	},
	compiler: {
		styledComponents: true,
		relay: {
			// This should match relay.config.js
			src: './',
			artifactDirectory: './__generated__',
			language: 'typescript',
		},
	},
	webpack: (config, { isServer }) => {
		if (!isServer) {
			config.resolve.fallback.fs = false;
			config.resolve.fallback.path = false;
			config.resolve.fallback.module = false;
		}
		return config;
	},
	sassOptions: {
		includePaths: [path.join(__dirname, 'styles')],
	},
	experimental: {
		// forceSwcTransforms: true,
	},
}
