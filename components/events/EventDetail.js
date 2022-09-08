import React, {useEffect, useState} from "react"
import Image from "next/image"
import Link from "next/link"
import styled from "styled-components/macro"

import {Header, Icon} from "~/components/UI"

import {HtmlContent} from "../UI/HtmlContent"
import PhotoGallery from "../UI/PhotoGallery"
import VideoPlayer from "../UI/VideoPlayer"

import {createThumbUrl} from "~/core/helpers/utils"

import style from "~/styles/event.module.sass"
import {Section} from "../UI"


const remoteLoader = ({src, width}) => {
	let breakpoints = [320, 450]
	if (breakpoints.indexOf(width) !== -1)
		return createThumbUrl(src, width)
	return src
}


const EventDetail = ({event, slug}) => {
	const date = event.date
	const [videoState, setVideoState] = useState(null)

	const videoClickHandle = () => {
		let currentState = videoState[event.id]
		currentState.playing = !videoState.playing
		setVideoState({
			...videoState,
			[event.id]: currentState
		})
	}

	useEffect(() => {
		setVideoState({
			[event.id]: {
				id: event.id,
				url: event?.url || null,
				ended: false,
				loaded: 0,
				played: 0,
				playing: false
			}
		})
	}, [event])

	return (
		<Section id={`event-${event.id}`}>
			<Header>{event.title}</Header>
			<figure className={style.cover}>
				{event.cover &&
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
				}

				{videoState && event.url && (
					<VideoPlayer
						id={event.id}
						playerState={videoState}
						setPlayerState={setVideoState}
					/>
				)}
			</figure>

			<div className="event-meta">
				<HtmlContent className="description">{event.description}</HtmlContent>
				{event.url && (
					<button className={`${style.button} centered`} onClick={videoClickHandle}>
						<Icon name="play" className="fs-5 me-2"/>
						<span>Смотреть видео</span>
					</button>
				)}
				<div>
					<b>Место проведения: </b>{event.location}
				</div>
				<div>
					<b>Дата мероприятия: </b>{date}
				</div>
			</div>

			{event.media.length > 0 && (
				<>
					<h2 className={style.title2}>
						Фотоотчет с мероприятия
					</h2>
					{/*<Slider sliders={event.media || []} className={style.slider} showThumbs={false} showTitle/>*/}
					<PhotoGallery
						slides={event.media}
						infinite
						paginationType="progressbar"
						layout="responsive"
					/>
				</>
			)}

			<Navigation className={style.navigation}>
				{
					event.prev?.id &&
					<Link href={slug + event.prev.id}>
						<a className={`${style.prev} nav-link`} title={event.prev.title}>
							<Icon name="arrow_left" className="nav-arrow left"/>
							<span>{event.prev.title}</span>
						</a>
					</Link>
				}
				{
					event.next?.id &&
					<Link href={slug + event.next.id} replace scroll={false}>
						<a className={`${style.next} nav-link`} title={event.next.title}>
							<span>{event.next.title}</span>
							<Icon name="arrow_right" className="nav-arrow right"/>
						</a>
					</Link>
				}
			</Navigation>

		</Section>
	)
}

export default EventDetail


const Navigation = styled.div``
