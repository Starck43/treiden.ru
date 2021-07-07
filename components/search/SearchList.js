import React from 'react'
import styled from 'styled-components/macro'
import { useRouter } from "next/router"
import Link from 'next/link'
import Image from 'next/image'

import { Section, Header, Icon } from '~/components/UI'
import Loading from '~/components/Loading'
import { Fetch, FetchError } from '~/core/api'
import { createThumbUrl, absoluteUrl } from '~/core/helpers/utils'


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

	const params = new URLSearchParams(router.query).toString()
	const { data, error } = Fetch(`search/?${params}`)
	if (error) return <FetchError error={error} />
	if (!data) return <Loading/>

	return (
		<Section>
			<header className='mt-5'><h1>Вы искали: {decodeURI(router.query['q'])}</h1></header>
			<p>Найдено записей: {String(data.length)}</p>
			<Container>
			{data
				? data.map(post =>
					<Item key={post.slug}>
						<Title>{post.title}</Title>
						{ post.cover &&
						<Image
							loader={remoteLoader}
							src={absoluteUrl(post.cover)}
							alt={post.title}
							layout="intrinsic"
							width={320}
							height={180}
							objectFit="cover"
							quality={80}
						/>
						}
						<Description content={post.excerpt} />

						{ post.url &&
						<Button className='mb-4'>
							<Link href={post.url}>
								<a className='centered'>
									<Icon name='play' className='fs-5 me-2' />
									<span>Смотреть видео</span>
								</a>
							</Link>
						</Button>
						}
						<p>
						{ post.post_type && post.post_type != 'event' &&
							<Link href={`projects/${post.post_type}`}><a>Перейти к проектам</a></Link>
						}
						{ post.post_type == 'event' &&
							<Link href={post.post_type+'/'+post.id}><a>Перейти к мероприятию</a></Link>
						}
						</p>
					</Item>
				)
				: <p>К сожалению, по Вашему запросу ничего не найдено.</p>
			}

			</Container>
			<ButtonLink className='nav-link' onClick={() => router.back()}>
				<Icon name='arrow_left' className='nav-arrow left' />
				<span>Назад</span>
			</ButtonLink>
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
const ButtonLink = styled.a``
const Button = styled.button``
