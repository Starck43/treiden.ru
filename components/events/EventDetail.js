import {Fragment, useEffect, useState} from "react"
import Link from "next/link"

import {Cover, Slider, VideoPlayer, HtmlContent, Section, Header, Icon} from "../UI"
import {SvgIcon} from "../UI/Icon"

import style from "~/styles/event.module.sass"


const EventDetail = ({event, slug}) => {
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
		<Fragment>
			<Section id={`event-${event.id}`} className={style.section}>
				<Header>{event.title}</Header>
				<figure className={style.cover}>
					{event.cover &&
					<Cover
						src={event.cover}
						alt={event?.title}
						sizes={[320, 450]}
						width={320}
						height={180}
						className={style.image}
					/>
					}

					{videoState && event.url &&
					<VideoPlayer
						id={event.id}
						playerState={videoState}
						setPlayerState={setVideoState}
					/>
					}
				</figure>

				<div className="event-meta">
					<HtmlContent className="description">{event.description}</HtmlContent>
					{event.url &&
					<button className={`${style.button} centered`} onClick={videoClickHandle}>
						<Icon name="play" className="fs-5 me-2"/>
						<span>Смотреть видео</span>
					</button>
					}
					<div>
						<b>Место проведения: </b>{event.location}
					</div>
					<div>
						<b>Дата мероприятия: </b>{event.date}
					</div>
				</div>

				{event.media.length > 0 &&
				<>
					<h2 className={style.title2}>
						Фотоотчет с мероприятия
					</h2>
					<Slider
						slides={event.media}
						effect="fade"
						layout="responsive"
						paginationType="progressbar"
						infinite
					/>
				</>
				}

			</Section>

			<div className={style.navigation}>
				{event.prev?.id &&
				<Link href={slug + event.prev.id}>
					<a className={`${style.prev} nav-link`} title={event.prev.title}>
						<SvgIcon id="#check-mark-icon" className={`check-mark arrow arrow-left ${style.svg}`}/>
						<span>{event.prev.title}</span>
					</a>
				</Link>
				}

				{event.next?.id &&
				<Link href={slug + event.next.id} replace scroll={false}>
					<a className={`${style.next} nav-link`} title={event.next.title}>
						<span>{event.next.title}</span>
						<SvgIcon id="#check-mark-icon" className={`check-mark arrow arrow-right ${style.svg}`}/>
					</a>
				</Link>
				}
			</div>
		</Fragment>
	)
}

export default EventDetail
