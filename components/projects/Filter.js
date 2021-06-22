import React from 'react'
import styled from 'styled-components/macro'
import Link from 'next/link'

import style from "~/styles/portfolio.module.sass"


const Filter = ({ categories }) => {
	return (
		<Container className={style.filter}>
		{ categories.map(item => (
			<Item className={style.filterItem} key={item.slug}>
				<Link href={`/projects/${item.slug}`}><a className={`${style.filterLink}`}>{item.name}</a></Link>
			</Item>
		))}
		</Container>
	)}


export default Filter

const Container = styled.div``
const Item = styled.div``
