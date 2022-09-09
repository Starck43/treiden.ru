import React, {Fragment, useState} from "react"
import {useRouter} from "next/router"
import styled from "styled-components/macro"
import {Icon} from "~/components/UI"

import {Navbar, Nav, Offcanvas} from "react-bootstrap"
import {NavLogo, NavItem, Search} from "~/components/navbar"
import Anchor from "~/components/UI/Anchor"

import getConfig from "next/config"

const data = getConfig().publicRuntimeConfig //next.config.js


const NavBar = (props) => {
	const router = useRouter()
	const [visible, setVisible] = useState(true)
/*
	const [prevScrollPos, setPrevScrollPos] = useState(0)

	const handleScroll = () => {
		const currentScrollPos = window.pageYOffset
		if (visible && currentScrollPos - prevScrollPos > 70) {
			setVisible(false)
			setPrevScrollPos(currentScrollPos)
		}
	}


	useEffect(() => {
		window.addEventListener("scroll", handleScroll)
		return () => window.removeEventListener("scroll", handleScroll)

	}, [visible])

*/

	return (
		<Fragment>
			<Anchor id="home" ref={props.navRef}/>
			<Navbar collapseOnSelect sticky={visible ? "top": ""} expand="lg" variant="light">
				<NavLogo href="/" logo={data.logo} pathname={router.pathname}/>
				<ContactBlock className="contacts centered">
					{
						props.contact?.socials
							? props.contact.socials.map(item =>
								<a className="social-link" key={item.name} href={item.url}>
									<Icon name={item.name.toLowerCase()} className="social-icon centered"/>
								</a>
							)
							: null
					}
					<a className="phone-link ms-sm-4" href={`tel:${props.contact.phone}`}>
						<Icon name="mobile" className="social-icon"/>
						<span className="phone-text">{props.contact.phone}</span>
					</a>
				</ContactBlock>

				<Search/>
				<Navbar.Toggle className="centered btn-light" aria-controls="responsive-navbar-nav"/>

				<Navbar.Offcanvas id="responsive-navbar-nav" placement="end" onHide={() => setVisible(true)}>
					<Nav className="mr-auto">
						<Offcanvas.Header closeButton/>
						<Offcanvas.Body>
							{props.navitems && props.navitems.map((item, index) =>
								<NavItem key={index} item={item} pathname={router.pathname}/>
							)}
						</Offcanvas.Body>
						<Socials className="socials d-lg-none">
							{props.contact?.socials
								? props.contact.socials.map(item =>
									<a className="social-link" key={item.name} href={item.url}>
										<Icon name={item.name.toLowerCase()} className="social-icon centered"/>
									</a>
								)
								: null
							}
						</Socials>
					</Nav>
				</Navbar.Offcanvas>
			</Navbar>
		</Fragment>
	)
}


export default NavBar

const Socials = styled.div``
const ContactBlock = styled.div`
	white-space: nowrap;
`