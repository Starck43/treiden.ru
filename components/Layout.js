import React, { Fragment, useRef } from "react"
import Navbar from "./navbar/Navbar"
import Meta from './Meta'
import { ScrollToTop } from '~/components/UI'
import Contacts from '~/components/contacts/Contacts'


const Layout = ({ children, navitems, contacts, posts, meta }) => {
	const homeRef = useRef(null)

	return(
	<Fragment>
		<Meta meta={meta} />
		<Navbar navitems={navitems} contact={contacts[0]} navRef={homeRef}/>
		<main id="main">
			{children}
		</main>
		<Contacts contacts={contacts} posts={posts} />
		<ScrollToTop homeRef={homeRef} />
	</Fragment>
)}

export default Layout

