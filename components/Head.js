//import React from 'react'
import NextHead from 'next/head'
import { siteSettings } from '~/core/settings/default.js'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig() //next.config.js

const Head = ({meta}) => {
	const { title, description, keywords } = publicRuntimeConfig.meta
	const siteName = typeof window !== 'undefined' && window.location.hostname ? window.location.hostname : ''

	return(
	<NextHead>
		<title>{meta?.title || title}</title>
		<meta name="description" content={meta?.description || description} />
		<meta name="keywords" content={meta?.keywords || keywords} />
		<meta property="og:site_name" content={siteName} />
		<meta property="og:description" content={meta?.description || description} />
		<meta property="og:title" content={meta?.title || title} />
		<meta property="og:image" content={meta?.image || publicRuntimeConfig.logo} />
	</NextHead>
)}


export default Head