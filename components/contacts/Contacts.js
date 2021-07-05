import React from 'react'
import styled from 'styled-components/macro'

import { Info, Map } from '~/components/contacts'

import { Icon } from '~/components/UI'
import Anchor from '~/components/UI/Anchor'
import { getHostname } from '~/core/helpers/utils'

import style from "~/styles/contacts.module.sass"


const Contacts = ({contacts, posts}) => {
	return (
	<Section className={style.section}>
		<Anchor id='contacts' />
		<LeftBlock className={`extra-posts ${style.leftBlock}`}>
			<ExtraPosts posts={posts} />
		</LeftBlock>
		<Info contact={contacts[0]} />
		<Map className={`map ${style.rightBlock}`} id="map" image={contacts[0].file} />
	</Section>
)}

export default Contacts


const ExtraPosts = ({posts}) =>  (
	posts.map((post) => (
		(post.extra_display_section == 'F' || post.extra_display_section == 'HF')
			? <Link className='post-link white centered' key={post.slug}><Icon name={getHostname(post.url)} className='social-icon' />{post.title}</Link>
			: null
	))
)

const Section = styled.section``
const LeftBlock = styled.div``
const RightBlock = styled.div``
const Link = styled.a``

