//import App from 'next/app'
import React, {useEffect, useState} from "react"
import {useRouter} from "next/router"
import NextNprogress from "nextjs-progressbar"

import Loader from "/components/UI/loader/Loader"

import {ThemeContainer, ErrorBoundary} from "/core"

import theme from "/core/themes/mainTheme"
import * as gtag from "/libs/gtag"

import "/styles/vendors/bootstrap.scss"
import "/styles/main.sass"


export default function MyApp({Component, pageProps}) {
	const router = useRouter()
	const [isLoaded, setLoaded] = useState(false)


	useEffect(() => {
		if (process.env.NODE_ENV === "production" && process.env.GA_ANALYTICS_MEASUREMENT_ID) {
			const handleRouteChange = url => {
				/* invoke analytics function only for production */
				gtag.pageview(url)
			}
			router.events.on("routeChangeComplete", handleRouteChange)
			return () => {
				router.events.off("routeChangeComplete", handleRouteChange)
			}
		}
	}, [router.events])

	useEffect(() => {
		setLoaded(true)
	}, [])


	if (!isLoaded) return <Loader/>
	if (typeof window === "undefined") return <></>
	return (
		<ThemeContainer>
			<ErrorBoundary>
				<ProgressBar/>
				<Component {...pageProps} />
			</ErrorBoundary>
		</ThemeContainer>
	)
}


const ProgressBar = () => (
	<NextNprogress
		color={theme.colors.brandColor}
		startPosition={0.3}
		stopDelayMs={300}
		height={3}
		showOnShallow={true}
		options={{easing: "ease", speed: 500}}
		nonce="my-nonce"
	/>
)
