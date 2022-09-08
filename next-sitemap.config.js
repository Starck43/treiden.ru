module.exports = {
	siteUrl: "https://treiden.ru",
	changefreq: "daily",
	priority: 0.7,
	sitemapSize: 9000,
	generateRobotsTxt: true,
	//exclude: ["/secret-page"],
	alternateRefs: [],
	robotsTxtOptions: {
		policies: [
			{
				userAgent: "*",
				allow: ["/", "/event/*", "/projects/*"],
				disallow: ["/api/*", "/search/?"],
			},
		],
	},
}
