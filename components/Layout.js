import React, { Fragment, useRef } from "react"
import Navbar from "./navbar/Navbar"
import Meta from './Meta'
import { ScrollToTop } from '~/components/UI'
import Contacts from '~/components/contacts/Contacts'


const Layout = ({ children, navitems, contacts, extra, meta }) => {
	const homeRef = useRef(null)

	return(
	<Fragment>
		<Meta meta={meta} />
		<Navbar navitems={navitems} contact={contacts[0]} navRef={homeRef} extra={extra}/>
		<main id="main">
			{children}
		</main>
		<Contacts contacts={contacts} extra={extra} />
		<ScrollToTop homeRef={homeRef} />
	</Fragment>
)}

export default Layout
