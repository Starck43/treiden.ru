import React from 'react'
import styled from 'styled-components/macro'
import Link from 'next/link'
import Image from 'next/image'

import { Section, Header, Icon, Anchor } from '~/components/UI'
import { List, Filter } from '~/components/projects'
import { getLinkType } from '~/core/helpers/utils'

import LiteYouTubeEmbed from "react-lite-youtube-embed"

import style from "~/styles/portfolio.module.sass"


const remoteLoader = ({ src }) => {
	return src
}

const PortfolioDetail = ({category, projects}) => {
	let link = getLinkType(category.url)

	return (
	<Section>
		<Header>{category.name}</Header>
		<Content className={style.content}>
			{ category.file &&
			<Image className={style.media}
				loader={remoteLoader}
				src={category.file}
				alt={category.name}
				layout="responsive"
				objectFit="contain"
				width={450}
				height={300}
				quality={80}
			/>
			}

			<div className={style.description} dangerouslySetInnerHTML={{ __html: category.description }} />

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
		<List projects={projects} title='Проекты' />
		<Link href="/#activities"><a className='nav-link'><Icon name='arrow_left' className='nav-arrow left' />Назад</a></Link>
	</Section>
)}

export default PortfolioDetail

const Content = styled.div``
const Cover = styled.div``
const YouTube = styled(LiteYouTubeEmbed)``
