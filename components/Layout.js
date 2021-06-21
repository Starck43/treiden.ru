import React, { Fragment, useRef } from "react"
import Navbar from "./navbar/Navbar"
import Head from './Head'
import { ScrollToTop } from '~/components/UI'


const Layout = ({ children, navitems, contacts, meta }) => {
	const homeRef = useRef(null)

	return(
	<Fragment>
		<Head meta={meta} />
		<Navbar navitems={navitems} contact={contacts[0]} navRef={homeRef}/>
		<main id="main">
			{children}
		</main>
		<ScrollToTop homeRef={homeRef} />
	</Fragment>
)}

export default Layout

