//import App from 'next/app'
import React from 'react'

import { ThemeContainer, ErrorBoundary } from '~/core'
import NextNprogress from 'nextjs-progressbar'
import theme from '~/core/themes/mainTheme'

import 'bootstrap/dist/css/bootstrap.css'
import '~/styles/main.sass'


function MyApp({ Component, pageProps }) {
	return (
	<ThemeContainer>
		<ErrorBoundary>
			<ProgressBar/>
			<Component {...pageProps} />
		</ErrorBoundary>
	</ThemeContainer>
	)
}

/*MyApp.getInitialProps = async (appContext) => {
    let pageProps = {};
    if (appContext.Component.getInitialProps) {
        pageProps = await appContext.Component.getInitialProps(appContext.ctx);
    }
    return { ...pageProps };
};*/

export default MyApp

const ProgressBar = () => (
  <NextNprogress
    color={theme.colors.brandColor}
    startPosition={0.3}
    stopDelayMs={300}
    height={3}
  />
)

