import {Fragment, useRef} from "react"

import {NavBar} from "./navbar"
import Meta from "./Meta"
import {Fetch} from "/core/api"

import {ScrollToTop} from "/components/UI"
import Contacts from "/components/contacts/Contacts"


const Layout = ({children, meta}) => {
	const homeRef = useRef(null)
	const { data: navItems } = Fetch(process.env.API_SERVER,"navitems")
	const { data: contacts } = Fetch(process.env.API_SERVER,"contacts")
	const { data: extra } = Fetch(process.env.API_SERVER,"posts/extra")
	return (
		<Fragment>
			<Meta meta={meta}/>
			<NavBar navitems={navItems} contact={contacts?.[0]} navRef={homeRef} extra={extra}/>
			<main id="main">
				{children}
			</main>
			<Contacts contacts={contacts} extra={extra}/>
			<ScrollToTop homeRef={homeRef}/>
		</Fragment>
	)
}

export default Layout
