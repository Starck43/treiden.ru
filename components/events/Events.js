import {useState} from "react"
import {Row, Col} from "react-bootstrap"

import {Item} from "~/components/events"
import {fetchEvents} from "../../core/api/api"
import {Section, Header} from "~/components/UI"
import Anchor from "~/components/UI/Anchor"

import style from "~/styles/events.module.sass"


const Events = ({data}) => {
	const [nextPage, setNextPage] = useState(data.next ? 2 : 0)
	const [events, addEvents] = useState(data.results || [])

	const loadMoreEvents = async () => {
		const post = await fetchEvents(nextPage)
		setNextPage(post.next ? nextPage + 1 : 0)
		addEvents([...events, ...post.results])
	}

	return (
		data.results?.length > 0 &&
		<Section className="events">
			<Anchor id="events"/>
			<Header>События</Header>
			<Row>
				{events.length > 0 &&
				<Col className={style.column_1}>
					<Item item={events[0]} mainColumn/>
				</Col>
				}
				{events.length > 1 &&
				<Col className={style.column_2} xs={12} lg={4}>
					{events.slice(1).map(event => <Item key={event.slug} item={event}/>)}
					{nextPage > 0 && <button className={style.button} onClick={loadMoreEvents}>Показать еще</button>}
				</Col>
				}
			</Row>
		</Section>
	)
}

export default Events

