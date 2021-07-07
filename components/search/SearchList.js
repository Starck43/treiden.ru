import React, { useState }  from 'react'
import styled from 'styled-components/macro'
import { useRouter } from "next/router"
import Link from 'next/link'
import Image from 'next/image'

import { Section, Header, Icon } from '~/components/UI'
import Loading from '~/components/Loading'
import { Fetch, FetchError } from '~/core/api'
import { getYouTubeID, createThumbUrl, absoluteUrl, truncateHTML } from '~/core/helpers/utils'

import LiteYouTubeEmbed from "react-lite-youtube-embed"


const remoteLoader = ({ src, width }) => {
	let breakpoints = [320]
	if (breakpoints.indexOf(width) !== -1)
		return createThumbUrl(src, width)
	return src
}


const HtmlContent = ({ className, content }) => (
	<p className={className} dangerouslySetInnerHTML={{ __html: content }}></p>
)

const SearchList = () => {
	const router = useRouter()
	const [fullMode, setVideoMode] = useState(false)

	const videoClickHandle = (e) => {
		e.currentTarget.style.position = 'static'
		//e.currentTarget.parentElement.style.width = '100%'
		setVideoMode(true)
	}

	const params = new URLSearchParams(router.query).toString()
	const { data, error } = Fetch(`search/?${params}`)
	if (error) return <FetchError error={error} />
	if (!data) return <Loading/>

	return (
		<Section>
			<header className='mt-5 mb-3'><h1>Вы искали: {decodeURI(router.query['q'])}</h1></header>
			<p>Найдено записей: {String(data.length)}</p>
			<Container>
			{data
				? data.map(post =>
					<Item key={post.slug}>
						<Title className="mb-3">{post.title}</Title>
						<Description content={post.excerpt || post.description && truncateHTML(post.description)} />
						<Cover onClick={videoClickHandle}>
							{ post.cover &&
							<Image
								loader={remoteLoader}
								src={absoluteUrl(post.cover)}
								alt={post.title}
								layout="intrinsic"
								objectFit="cover"
								objectPosition="left"
								width={320}
								height={180}
								quality={80}
							/>
							}

							{ post.url && getYouTubeID(post.url) ?
								<YouTube
									id={getYouTubeID(post.url)}
									title={post.title}
									wrapperClass="youtube-lite"
									playerClass="play-btn"
									adNetwork={false}
								/>
								: post.url && <p><Link href={post.url}><a>[Перейти]</a></Link></p>
							}
						</Cover>

						<div className="mt-4 mb-2">
						{
							!post.url || getYouTubeID(post.url) ? (
								post.post_type == 'category'
								? (<Link href={`projects/${post.slug}`}><a>Перейти в раздел</a></Link>)
								: (post.post_type == 'event'
									? (<Link href={`event/${post.id}`}><a>Перейти к мероприятию</a></Link>)
									: (<Link href={`projects/${post.post_type}`}><a>Перейти к проектам</a></Link>)
								)
							) : null
						}
						</div>
					</Item>
				)
				: <p>К сожалению, по Вашему запросу ничего не найдено.</p>
			}

			</Container>
			<Back className='nav-link' onClick={() => router.back()}>
				<Icon name='arrow_left' className='nav-arrow left' />
				<span>Назад</span>
			</Back>
		</Section>
)}



export default SearchList


const Container = styled.ul`
	padding: 0;
`
const Item = styled.li`
	padding: 1.5em 0em;
	border-top: 1px solid rgba(0, 0, 0, .2);

`
const Title = styled.h3``
const Description = styled(HtmlContent)``
const Back = styled.a``
const Cover = styled.div`
	position: relative;
	width: max-content;
	line-height: 0;
`
const YouTube = styled(LiteYouTubeEmbed)``

