import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'


class MyDocument extends Document {
	static async getInitialProps(ctx) {
		const initialProps = await Document.getInitialProps(ctx)
		return { ...initialProps }
	}

	render() {
		return (
			<Html lang="ru">
				<Head/>
				<body>
					<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" style={{display:'none'}}>
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
