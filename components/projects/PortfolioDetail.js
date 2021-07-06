import React from 'react'
import styled from 'styled-components/macro'
import Link from 'next/link'
import Image from 'next/image'

import { getLinkType, createThumbUrl } from '~/core/helpers/utils'
import { Section, Header, Icon, Anchor } from '~/components/UI'
import { List, Filter } from '~/components/projects'

import LiteYouTubeEmbed from "react-lite-youtube-embed"

import style from "~/styles/portfolio.module.sass"



const remoteLoader = ({ src, width }) => {
	let breakpoints = [320, 450]
	if (breakpoints.indexOf(width) !== -1)
		return createThumbUrl(src, width)
	return src
}


const PortfolioDetail = ({category, projects}) => {
	let link = getLinkType(category.url)

	return (
	<Section>
		<Header>{category.name}</Header>
		<Content className={style.content}>
			{ category.file &&
			<Image className={style.flexImage}
				loader={remoteLoader}
				src={category.file}
				alt={category.name}
				layout="intrinsic"
				width={450}
				height={300}
				quality={80}
			/>
			}

			<div className={ `${category.file ? style.flexDescription : style.description}` } dangerouslySetInnerHTML={{ __html: category.description }} />

			{ link.type == 'youtube' && (
			<Cover className={style.media}>
				<Image
					className={style.image}
					loader={remoteLoader}
					src={category.cover}
					alt={category.name}
					layout="intrinsic"
					objectFit="cover"
					width={450}
					height={300}
					quality={80}
				/>
				<YouTube
					id={link.id}
					title={category.name}
					wrapperClass="youtube-lite"
					playerClass="play-btn"
					adNetwork={false}
				/>
			</Cover>
			)}
		</Content>
		{ projects.length > 0 && <List projects={projects} title='Проекты' /> }
		<Link href="/#activities"><a className='nav-link'><Icon name='arrow_left' className='nav-arrow left' />Назад</a></Link>
	</Section>
)}

export default PortfolioDetail

const Content = styled.div`
	>div:first-child:not(:last-child){
		flex: 1 1 40%;
		max-width: 40% !important;
		margin-right: 4vw !important;
		margin-bottom: 4vw !important;
		@media screen and (max-width:767.98px) {
			flex: 100%;
			max-width: 100%;
			margin: 0 auto 4vw !important;
		}
	}

`

const Cover = styled.div``
const YouTube = styled(LiteYouTubeEmbed)``
