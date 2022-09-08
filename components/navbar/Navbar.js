import React, {Fragment} from "react"
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

	const toggleShow = (e) => {
		if (e.target.classList.contains("navbar-collapse")) {
			document.querySelector(".navbar-toggler").click()
		}
	}

	const clickBurger = (e) => {
		let toggler = e.currentTarget
		if (typeof window !== "undefined") document.body.style.overflow = (
			window.getComputedStyle(toggler).display === "none" ||
			window.getComputedStyle(toggler.nextElementSibling).display !== "none"
		) ? "" : "hidden"
	}

	const handleClose = () => typeof window !== "undefined" && document.querySelector(".navbar-toggler").click()

	return (
		<Fragment>
			<Anchor id="home" ref={props.navRef}/>
			<Navbar expand="lg" variant="light">
				<NavLogo href="/" logo={data.logo} pathname={router.pathname}/>
				<ContactBlock className="contacts centered">
					{
						props.contact?.socials
							? props.contact.socials.map(item =>
								<Link className="social-link" key={item.name} href={item.url}>
									<Icon name={item.name.toLowerCase()} className="social-icon centered"/>
								</Link>
							)
							: null
					}
					<Link className="phone-link ms-sm-4" href={`tel:${props.contact.phone}`}>
						<Icon name="mobile" className="social-icon"/>
						<span className="phone-text">{props.contact.phone}</span>
					</Link>
				</ContactBlock>

				<Search/>
				<Navbar.Toggle
					className="centered btn-light"
					aria-controls="responsive-navbar-nav"
					onClick={clickBurger}
				/>
				<Navbar.Offcanvas placement="end" id="responsive-navbar-nav" onClick={toggleShow}>
					<Nav className="mr-auto">
						<Offcanvas.Header closeButton/>
						{props.navitems && props.navitems.map((item, index) =>
							<NavItem key={index} item={item} pathname={router.pathname} close={handleClose}/>
						)}
						<Socials className="socials d-lg-none">
							{props.contact?.socials
								? props.contact.socials.map(item =>
									<Link className="social-link" key={item.name} href={item.url}>
										<Icon name={item.name.toLowerCase()} className="social-icon centered"/>
									</Link>
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

const Link = styled.a``
const Socials = styled.div``
const ContactBlock = styled.div`
	white-space: nowrap;
`