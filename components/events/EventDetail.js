import React, { Fragment } from 'react'
import styled from 'styled-components/macro'
import Image from 'next/image'
import Link from 'next/link'
import { Container } from 'react-bootstrap'

import { Header, Slider, Icon } from '~/components/UI'
import { getYouTubeID, createThumbUrl } from '~/core/helpers/utils'

import LiteYouTubeEmbed from "react-lite-youtube-embed"

import style from "~/styles/event.module.sass"



const remoteLoader = ({ src, width }) => {
	let breakpoints = [320, 450]
	if (breakpoints.indexOf(width) !== -1)
		return createThumbUrl(src, width)
	return src
}

const HtmlContent = ({ className, content }) => (
	<div className={className} dangerouslySetInnerHTML={{ __html: content }}></div>
)


const EventDetail = ({ event }) => {
	const date = event.date //new Date(event.date).toLocaleDateString()

	const videoClickHandle = (e) => {
		let yt = document.querySelector('.youtube-lite')
		e.currentTarget.disabled = true
		yt && yt.click()
	}

	const InitFrame = () => {}

	return (
	<Container id={`event-${event.id}`} className={style.container}>
		<Header>{event.title}</Header>

		<Cover className={style.cover}>
			<Image
				className={style.image}
				loader={remoteLoader}
				src={event.cover}
				alt={event.title}
				layout="responsive"
				width={320}
				height={180}
				objectFit="cover"
				quality={80}
			/>
			{ event.url && (
				<YouTube
					id={getYouTubeID(event.url)}
					title={event.title}
					wrapperClass="youtube-lite"
					playerClass="play-btn"
					adNetwork={false}
					onIframeAdded={InitFrame()}
				/>
			)}
		</Cover>
		<Content className={style.content}>
			<Description content={event.description} />
			{ event.url && (
				<Button className={style.button}>
					<VideoLink className='centered' onClick={videoClickHandle}>
						<Icon name='play' className='fs-5 me-2' />
						<span>Смотреть видео</span>
					</VideoLink>
				</Button>
			)}
			<Location>
				<b>Место проведения: </b>{event.location}
			</Location>
			<EventDate>
				<b>Дата мероприятия: </b>{date}
			</EventDate>
		</Content>

		{ event.media.length > 0 && (
		<>
			<h2 className={style.title2}>Фотоотчет с мероприятия</h2>
			<Slider sliders={event.media || []} className={style.slider} showThumbs={false} showTitle={true}/>
		</>
		)}

		<Navigation className={style.navigation}>
		{ event.prev?.id &&
			<Link href={'/event/'+event.prev.id}>
				<a className={`${style.prev} nav-link`} title={event.prev.title}>
					<Icon name='arrow_left' className='nav-arrow left' />
					<span>{event.prev.title}</span>
				</a>
			</Link>
		}
		{ event.next?.id &&
			<Link href={'/event/'+event.next.id}>
				<a className={`${style.next} nav-link`} title={event.next.title}>
					<span>{event.next.title}</span>
					<Icon name='arrow_right' className='nav-arrow right' />
				</a>
			</Link>
		}
		</Navigation>

	</Container>
)}

export default EventDetail


const Cover = styled.figure``
const YouTube = styled(LiteYouTubeEmbed)``
const Content = styled.div``
const Button = styled.button``
const VideoLink = styled.a``
const Location = styled.p``
const EventDate = styled.p``
const Description = styled(HtmlContent)``
const Navigation = styled.div``
