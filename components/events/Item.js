import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import styled from 'styled-components/macro'

import style from "~/styles/events.module.sass"

const remoteLoader = ({ src }) => {
	return src
}

const Item = ({ item }) => {
	return (
	<Article className={`card ${style.article}`}>
		<Image
			className={style.image}
			loader={remoteLoader}
			src={item.cover}
			alt={item.title}
			layout="responsive"
			objectFit="cover"
			width={320}
			height={180}
			quality={80}
		/>
		<Body className={style.body}>
			<h2 className='post-title'>
				<Link href={'/event/'+item.id}><a>{item.title}</a></Link>
			</h2>
			<p className={`card-text ${style.excerpt}`}>{item.excerpt}</p>
			<p className={`card-date ${style.date}`}>{item.date}</p>
		</Body>

	</Article>
)}


export default Item

const Article = styled.article``
const Body = styled.div``
const Button = styled.button``


