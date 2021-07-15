import React from 'react'
import styled from 'styled-components/macro'

import { Slider, Icon } from '~/components/UI'
import Loading from '~/components/Loading'
import {Fetch, FetchError } from '~/core/api'
import { header } from '~/core/settings/default'
import { getHostname } from '~/core/helpers/utils'

import style from "~/styles/header.module.sass"

const Header = ({posts, sliders}) => {

	const sliderProps = {
		autoPlay: true,
		interval: 7000,
		infiniteLoop: true,
		showThumbs: true,
	}

	return (
		<HeaderSection className={`header-section ${style.section}`}>
			<Posts className={`extra-posts ${style.post}`}>
				<ExtraPosts posts={posts} />
			</Posts>
			<Title className={(posts.length > 1 ? `${style.titleBottom}` : '')+` ${style.title}`}>
				<div>{header.title}</div>
				<div className={style.subtitle}>{header.subtitle}</div>
			</Title>
			<Slider sliders={sliders} className={style.slider} groupKey={'activities'} {...sliderProps} />
		</HeaderSection>
	)
}

export default Header

const ExtraPosts = ({posts}) =>  (
	posts.map((post) => (
		(post.extra_display_section == 'H' || post.extra_display_section == 'HF')
			? <Link
				id={post.slug}
				className='post-link white'
				key={post.slug}
				href={post.url}
				target='_blank'
			  >
				<Icon name={getHostname(post.url)} className='social-icon' />
				{ post.description ?
				<Content dangerouslySetInnerHTML={{ __html: post.description }} />
				: post.title
				}
			  </Link>
			: null
	))
)

const HeaderSection = styled.section``
const Title = styled.header`
	display: block;
`
const Posts = styled.div``
const Content = styled.div``
const Link = styled.a``


