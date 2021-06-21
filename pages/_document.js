import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { flushToHTML } from 'styled-jsx/server'
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
		const styles = flushToHTML()
		return (
			<Html lang="ru">
				<Head>
					<meta charSet="utf-8" />
					{/*<meta name="viewport" content="width=device-width,minimum-scale=0.8,maximum-scale=1,user-scalable=no" />*/}
					<meta name="robots" content="follow, index" />
					<meta name="google-site-verification" content=""/>
					<meta name="robots" content="index,follow" />
					<meta name="googlebot" content="index,follow" />
					<meta name="theme-color" content="#ffffff" />
					<link rel="icon" href="/favicon.ico" />
					<link rel="apple-touch-icon" href="/icons/Icon-64.png" />
					<link
						rel="preload"
						href="fonts/ip/font/ip.woff"
						as="font"
						crossOrigin=""
					/>
					<link
						href="/icons/Icon-32.png"
						rel="icon"
						type="image/png"
						sizes="32x32"
					/>
					<link
						href="/icons/Icon-64.png"
						rel="icon"
						type="image/png"
						sizes="64x64"
					/>

					<link rel="canonical" href="#" />
					<link rel="manifest" href="/manifest.json" />

					{styles}

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
						/>
					</>
					)}
				</Head>
				<body>

					<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" style={{'display':'none'}}>
						<symbol id="check-mark-icon" viewBox="0 0 46 20">
							<path d="M1.35987 18.2266L22.75 1.27592L44.1401 18.2266L23.3875 11.2478C22.9739 11.1087 22.5261 11.1087 22.1125 11.2478L1.35987 18.2266Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
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
