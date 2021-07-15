import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import getConfig from 'next/config'

const isProduction = process.env.NODE_ENV === "production"
const { publicRuntimeConfig, serverRuntimeConfig } = getConfig() //next.config.js

/*
 * Some notes:
 * 1) _document.js will load on server side -> all this meta tag will be fetched by Scraper of Facebook, Linkedin, ...
 * 2) og:image need to be change name in order for FB to reload the new preview image
 * 3) sharing on staging env wont work, because og:url is set to main page
 */

class MyDocument extends Document {
	static async getInitialProps(ctx) {
		const initialProps = await Document.getInitialProps(ctx)
		return { ...initialProps }
	}

	render() {
		return (
			<Html lang="ru">
				<Head>
					<meta charSet="utf-8" />
					{/*<meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />*/}
					{/*<meta name="viewport" content="width=device-width,minimum-scale=0.8,maximum-scale=1,user-scalable=no" />*/}
					<meta name="robots" content="index,follow" />
					<meta name="googlebot" content="index,follow" />
					<meta name="google-site-verification" content="H5C5oN1s5MBS3ussfkd9iwbtRr5ZXaCfNrLMIuWdJYc"/>
					<meta name="yandex-verification" content="809052e19175c0f4" />

					<link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png"/>
					<link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png"/>
					<link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png"/>
					<link rel="manifest" href="/favicons/site.webmanifest"/>
					<link rel="mask-icon" href="/favicons/safari-pinned-tab.svg" color="#073f80"/>
					<link rel="shortcut icon" href="/favicons/favicon.ico"/>
					<meta name="apple-mobile-web-app-title" content="Трейден Медиа Групп"/>
					<meta name="application-name" content="Трейден Медиа Групп"/>
					<meta name="msapplication-TileColor" content="#073f80"/>
					<meta name="msapplication-TileImage" content="/favicons/mstile-144x144.png"/>
					<meta name="msapplication-config" content="/favicons/browserconfig.xml"/>
					<meta name="theme-color" content="#ffffff"/>

					<link rel="canonical" href={process.env.SERVER} />


					{isProduction && publicRuntimeConfig.googleAnalyticsId && (
					<>
						<script
							async
							defer
							src={`https://www.googletagmanager.com/gtag/js?id=${publicRuntimeConfig.googleAnalyticsId}`}
						/>

						<script
							dangerouslySetInnerHTML={{
								__html: `
								window.dataLayer = window.dataLayer || [];
								function gtag(){dataLayer.push(arguments);}
								gtag('js', new Date());

								gtag('config', '${publicRuntimeConfig.googleAnalyticsId}');
								`
							}}
							dangerouslySetInnerHTML={{
								__html: `
								(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
									m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
								(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

								ym(${publicRuntimeConfig.yandexMetrikaId}, "init", {
									clickmap:true,
									trackLinks:true,
									accurateTrackBounce:true
								});
								`
							}}
						/>
					</>
					)}
				</Head>
				<body>

					<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" style={{'display':'none'}}>
						<symbol id="check-mark-icon" viewBox="0 0 46 20">
							<path d="M1.35987 18.2266L22.75 1.27592L44.1401 18.2266L23.3875 11.2478C22.9739 11.1087 22.5261 11.1087 22.1125 11.2478L1.35987 18.2266Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
						</symbol>
					</svg>

					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}

export default MyDocument
