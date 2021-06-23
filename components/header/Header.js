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
		autoFocus: true,
		autoPlay: true,
		interval: 5000,
		infiniteLoop: false,
		showThumbs: true,
	}

	return (
		<HeaderSection className={`header-section ${style.section}`}>
			<Posts className={`extra-posts ${style.post}`}>
				<ExtraPosts posts={posts} />
			</Posts>
			<Title className={style.title}>
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
			? <Link className='post-link white centered' key={post.slug}><Icon name={getHostname(post.url)} className='social-icon' />{post.title}</Link>
			: null
	))
)

const HeaderSection = styled.section``
const Title = styled.header`
	display: block;
`
const Posts = styled.div``
const Link = styled.a``


