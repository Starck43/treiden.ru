import NextHead from "next/head"
import getConfig from "next/config"

const {publicRuntimeConfig} = getConfig() //next.config.js
const googleAnalyticsId = process.env.GA_ANALYTICS_MEASUREMENT_ID
const yandexMetrikaId = process.env.YANDEX_METRIKA_ID


const Meta = ({meta}) => {
	const {title, description, keywords} = publicRuntimeConfig.meta
	const siteName = typeof window !== "undefined" && window.location.hostname ? window.location.hostname : ""

	return (
		<NextHead>
			<meta charSet="utf-8"/>

			<title>{meta?.title || title}</title>
			<meta name="description" content={meta?.description || description}/>
			<meta name="keywords" content={meta?.keywords || keywords}/>
			<meta property="og:site_name" content={siteName}/>
			<meta property="og:description" content={meta?.description || description}/>
			<meta property="og:title" content={meta?.title || title}/>
			<meta property="og:image" content={meta?.image || publicRuntimeConfig.logo}/>
			<meta name="robots" content="index,follow"/>
			<meta name="googlebot" content="index,follow"/>
			<meta name="google-site-verification" content={process.env.GOOGLE_VERIFICATION}/>
			<meta name="yandex-verification" content={process.env.YANDEX_VERIFICATION}/>

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

			<link rel="canonical" href={siteName}/>

			{process.env.NODE_ENV === "production" && googleAnalyticsId &&
			<>
				<meta name="googlebot" content="index, follow"/>
				<script async defer src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}/>

				<script
					dangerouslySetInnerHTML={{
						__html: `
							window.dataLayer = window.dataLayer || [];
							function gtag(){dataLayer.push(arguments);}
							gtag('js', new Date());

							gtag('config', '${googleAnalyticsId}');
							`
					}}
				/>
			</>
			}

			{process.env.NODE_ENV === "production" && yandexMetrikaId &&
			<>
				<script
					dangerouslySetInnerHTML={{
						__html: `
							(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
								m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
							(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

							ym(${yandexMetrikaId}, "init", {
								clickmap:true,
								trackLinks:true,
								accurateTrackBounce:true
							});
						`
					}}
				/>
				<noscript
					dangerouslySetInnerHTML={{
						__html: `
							<div><img src="https://mc.yandex.ru/watch/${yandexMetrikaId}" style="position:absolute; left:-9999px;" alt="" /></div>
						`
					}}
				/>
			</>
			}

		</NextHead>
	)
}


export default Meta