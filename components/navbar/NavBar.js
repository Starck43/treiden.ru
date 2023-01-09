import {Fragment, memo, useState} from "react"
import styled from "styled-components/macro"
import {Navbar, Nav, Offcanvas} from "react-bootstrap"
import {useRouter} from "next/router"
import getConfig from "next/config"

import {Icon, Anchor} from "/components/UI"

import {NavLogo} from "./NavLogo"
import {Search} from "./Search"
import NavItem from "./NavItem"
import ExtraPosts from "../posts/ExtraPosts"

const data = getConfig().publicRuntimeConfig //next.config.js


export const NavBar = memo((props) => {
	const router = useRouter()
	const [visible, setVisible] = useState(false)
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
			<Navbar expanded={visible} className="sticky-top" expand="lg" variant="light">
				<NavLogo href="/" logo={data.logo} pathname={router.pathname}/>

				{props.extra &&
				<div className={`extra-posts section-navbar`}>
					<ExtraPosts posts={props.extra} sections={["NB", "HF"]}/>
				</div>
				}

				<ContactBlock className="contacts centered">
					{props.contact?.socials
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

				<Navbar.Toggle className="centered btn-light" aria-controls="responsive-navbar-nav"
				               onClick={() => setVisible(true)}/>

				<Navbar.Offcanvas id="responsive-navbar-nav" placement="end" onHide={() => setVisible(false)}
				                  onShow={() => setVisible(true)}>
					<Nav className="mr-auto">
						<Offcanvas.Header closeButton/>
						<Offcanvas.Body>
							{props.navitems && props.navitems.map((item, index) =>
								<NavItem key={`navbar-${index}`} item={item} pathname={router.pathname}
								         setVisible={setVisible}/>
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
})

NavBar.displayName = "NavBar"

const Socials = styled.div``
const ContactBlock = styled.div`
	white-space: nowrap;
`
