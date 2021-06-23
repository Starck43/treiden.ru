import React, { Fragment, useState } from 'react'
import styled from 'styled-components/macro'

import { Row, Col } from 'react-bootstrap'
import { Item } from '~/components/events'

import { Section, Header } from '~/components/UI'
import Anchor from '~/components/UI/Anchor'
import Loading from '~/components/Loading'
import {Fetch, FetchError } from '~/core/api'

import style from "~/styles/events.module.sass"


const Events = ({data}) => {
	const [nextPage, setNextPage] = useState(data.next ? 2 : 0)
	const [events, addEvents] = useState(data.results)

	const loadMoreEvents = () => {
		fetch(process.env.API_SERVER + 'events/?page='+nextPage)
		.then(response => response.json())
		.then(function(data) {
			setNextPage(data.next ? nextPage+1 : 0)
			addEvents([...events, ...data.results])
		})
	}

	return (
	<Section>
		<Anchor id='events' />
		<Header>События</Header>
		<Row>
		{ events.length > 0 &&
			<Col className={style.column_1}>
				<Item item={events[0]} />
			</Col>
		}
		{ events.length > 1 &&
			<Col className={style.column_2} xs={12} lg={4}>
				{ events.slice(1).map(event => <Item key={event.slug} item={event} /> )}
				{ nextPage > 0 && <Button className={style.button} onClick={loadMoreEvents}>Показать еще</Button> }
			</Col>
		}
		</Row>

	</Section>
)}

export default Events

const Button = styled.button``
