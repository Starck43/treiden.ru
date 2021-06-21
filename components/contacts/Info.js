import React from 'react'
import styled from 'styled-components/macro'
import { Icon } from '~/components/UI'

import { getHostname } from '~/core/helpers/utils'

import style from "~/styles/contacts.module.sass"


const Info = ({contact}) => {
	return(
	<Container className={`contacts-container ${style.centerBlock}`}>
		<ContactBlock>
			<Icon name="envelope" className='icon' />
			<Link className='white' href={`mailto:${contact.email}`}>{contact.email}</Link>
		</ContactBlock>

		<ContactBlock>
			<Icon name="phone" className='icon' />
			<Link className='white' href={`tel:${contact.phone}`}>{contact.phone}</Link>
			{contact?.add_contact && <AddContact className='add-contact'><Icon name="mobile" className='icon' />{contact.add_contact}</AddContact>}
		</ContactBlock>

		<ContactBlock>
			<Icon name="location" className='icon' />
			{contact.address}
		</ContactBlock>

		<Socials className='socials'>
			{contact.socials ? contact.socials.map((item) => (
				<Link className='social-link white' key={item.name} href={item.url}>
					<Icon name={item.name.toLowerCase()} className={`${style.social} social-icon centered`} />
				</Link>
			)) : null}
		</Socials>
	</Container>
)}

export default Info


const AddContact = styled.div``
const Socials = styled.div``
const Link = styled.a``

const Container = styled.div`
	color: #fff;
`
const ContactBlock = styled.div`
	color: #fff;
	line-height: 2;
	white-space: nowrap;
`

