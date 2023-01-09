import dynamic from "next/dynamic"

import Layout from "/components/Layout"
import Loader from "/components/UI/loader/Loader"

const DynamicEventDetail = dynamic(() => import('/components/events').then((mod) => mod.EventDetail), {
	loading: () => <Loader />,
	ssr: false,
})

const EventPage = ({event}) => {
	return (
		<Layout meta={event.seo}>
			<DynamicEventDetail event={event} slug="/event/"/>
		</Layout>
	)
}

export default EventPage


export const getStaticPaths = async () => {
	const data = await fetch(process.env.API_SERVER + "events")
	const events = await data.json()

	const paths = events.map(item => ({
		params: {id: item.id.toString()},
	}))

	return {paths, fallback: false}
}


export const getStaticProps = async ({params}) => {
	const event = await fetch(process.env.API_SERVER + "event/" + params.id)

	return {
		props: {
			event: await event.json(),
		},
		revalidate: 60 * 60 * 24,
	}
}
