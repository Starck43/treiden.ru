import React from "react"
import Layout from "~/components/Layout"
import {EventDetail} from "~/components/events"


const EventPage = ({navitems, event, posts, contacts}) => {
	return (
		<Layout navitems={navitems} contacts={contacts} posts={posts} meta={event.seo}>
			<EventDetail event={event} slug="/event/"/>
		</Layout>
	)
}

export default EventPage


export const getStaticPaths = async () => {
	const data = await fetch(process.env.API_SERVER + "events")
	const events = await data.json()

	const paths = events.map((item) => ({
		params: {id: item.id.toString()},
	}))

	return {paths, fallback: false}
}


export const getStaticProps = async ({params}) => {
	const navitems = await fetch(process.env.API_SERVER + "navitems")
	const event = await fetch(process.env.API_SERVER + "event/" + params.id)
	const contacts = await fetch(process.env.API_SERVER + "contacts")
	const extraPosts = await fetch(process.env.API_SERVER + "posts/extra")

	return {
		props: {
			navitems: await navitems.json(),
			event: await event.json(),
			posts: await extraPosts.json(),
			contacts: await contacts.json(),
		},
		revalidate: 60 * 60 * 24,
	}
}