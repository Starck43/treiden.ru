import {useEffect, useState} from "react"
import {useRouter} from "next/router"

import Loader from "/components/UI/loader/Loader"

import {ThemeContainer, ErrorBoundary} from "/core"

import * as gtag from "/libs/gtag"

import "/styles/vendors/bootstrap.scss"
import "/styles/main.sass"


export default function MyApp({Component, pageProps}) {
	const router = useRouter()
	const [isLoaded, setLoaded] = useState(false)


	useEffect(() => {
		if (process.env.NODE_ENV === "production" && process.env.GA_ANALYTICS_MEASUREMENT_ID) {
			const handleRouteChange = url => gtag.pageview(url)
			router.events.on("routeChangeComplete", handleRouteChange)
			return () => router.events.off("routeChangeComplete", handleRouteChange)
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
				<Component {...pageProps} />
			</ErrorBoundary>
		</ThemeContainer>
	)
}
