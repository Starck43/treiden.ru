import React from 'react'
import styled from 'styled-components/macro'
import { useRouter } from "next/router"
import Link from 'next/link'

import { Section, Header, Icon } from '~/components/UI'
import Loading from '~/components/Loading'
import { Fetch, FetchError } from '~/core/api'


const HtmlContent = ({ className, content }) => (
	<div className={className} dangerouslySetInnerHTML={{ __html: content }}></div>
)

const SearchList = () => {
	const router = useRouter()

	const params = new URLSearchParams(router.query).toString()
	const { data, error } = Fetch(`search/?${params}`)
	if (error) return <FetchError error={error} />
	if (!data) return <Loading/>

	return (
		<Section>
			<Header>Вы искали: {router.query['q']}</Header>
			<p>Найдено записей: {String(data.length)}</p>
			<Container>
			{data
				? data.map(post =>
					<Item key={post.slug}>
						<Title>{post.title}</Title>
						<Description content={post.description} />
					</Item>
				)
				: <p>К сожалению, по Вашему запросу ничего не найдено.</p>
			}

			</Container>
			<Button className='nav-link' onClick={() => router.back()}>
				<Icon name='arrow_left' className='nav-arrow left' />
				<span>Назад</span>
			</Button>
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
const Button = styled.a``

