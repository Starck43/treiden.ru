const path = require('path')

module.exports = {
	env: {
		API_SERVER: process.env.SERVER_URL + '/api/',
		SEARCH_ENDPOINT: 'search',
	},
	publicRuntimeConfig: {
		logo: '/images/logo.png',
		meta: {
			title: 'Трейден Медиа Групп - идеи со знаком качества',
			description: 'Создание рекламных, коммуникационных и ивент-продуктов федерального качества по провинциальной цене',
			keywords: "реклама, медиа, брендинг, видеопродакшн, ивенты, AR, дополненная реальность, маркетинговые услуги, продвижение бренда",
		},
	},
	serverRuntimeConfig: {},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: process.env.SERVER_HOST || 'localhost',
				port: '',
				pathname: '/media/**',
			},
		],
		deviceSizes: [320, 450, 640, 768, 1080, 1200, 1920], // breakpoints
		imageSizes: [320, 450, 640, 900], // breakpoints
	},
	compiler: {
		styledComponents: true,
	},
	sassOptions: {
		includePaths: [path.join(__dirname, 'styles')],
	},
	experimental: {
	},
}
