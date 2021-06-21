import React, { Fragment } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components/macro'
import { Icon } from '~/components/UI'

import { Navbar, Nav } from 'react-bootstrap'
import { NavLogo, NavItem, Search } from '~/components/navbar'
import Anchor from '~/components/UI/Anchor'

import getConfig from 'next/config'
const data = getConfig().publicRuntimeConfig //next.config.js


const NavBar = (props) => {
	const router = useRouter()

	const toggleShow = (e) => {
		if (e.target.classList.contains('navbar-collapse')) {
			document.querySelector('.navbar-toggler').click()
		}
	}
	const clickBurger = (e) => document.body.style.overflow = (e.currentTarget.classList.contains('collapsed')) ? 'hidden' : ''
	const handleClose = (e) => {
		document.body.style.overflow = ''
		document.querySelector('.navbar-toggler').click()
	}

	return (
		<Fragment>
			<Anchor id="home" ref={props.navRef}/>
			<Navbar sticky="top" expand="lg" variant="light" collapseOnSelect>
				<NavLogo href='/' logo={data.logo} pathname={router.pathname} />
				<ContactBlock className='contacts centered'>
					{props.contact.socials ? props.contact.socials.map((item) => (
					<Link className='social-link' key={item.name} href={item.url}>
						<Icon name={item.name.toLowerCase()} className='social-icon centered' />
					</Link>
					)) : null}
					<Link className='phone-link ms-sm-4' href={`tel:${props.contact.phone}`}>
						<Icon name="mobile" className='social-icon' />
						<span className='phone-text'>{props.contact.phone}</span>
					</Link>
				</ContactBlock>

				<Search/>
				<Navbar.Toggle className='centered btn-light' aria-controls="responsive-navbar-nav" onClick={clickBurger}/>
				<Navbar.Collapse id="responsive-navbar-nav" onClick={toggleShow}>
					<Nav className="mr-auto">
					<button type="button" className="btn-close btn-lg" aria-label="Закрыть" onClick={handleClose}></button>
					{props.navitems && props.navitems.map((item, index) => (
						<NavItem key={index} item={item} pathname={router.pathname} close={handleClose}/>
					))}
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</Fragment>
)}


export default NavBar

const Link = styled.a``
const ContactBlock = styled.div`
	white-space: nowrap;
`