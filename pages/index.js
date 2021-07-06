import React from 'react'
import dynamic from 'next/dynamic'

import Header from '~/components/header/Header'
import Layout from '~/components/Layout'


const AsyncHeader = dynamic(() => import('~/components/header/Header'))
const AsyncAbout = dynamic(() => import('~/components/services').then((mod) => mod.About))
const AsyncActivities = dynamic(() => import('~/components/services').then((mod) => mod.Activities))
const AsyncEvents = dynamic(() => import('~/components/events/Events'))
const AsyncCustomers = dynamic(() => import('~/components/customers/Customers'))
const AsyncAwards = dynamic(() => import('~/components/awards/Awards'))


const HomePage = (props) => {
	return(
	<Layout navitems={props.navitems} contacts={props.contacts} posts={props.posts} meta={props.meta[0]} >
		<AsyncHeader sliders={props.header} posts={props.posts}/>
		<AsyncAbout data={props.about}/>
		<AsyncActivities activities={props.activities}/>
		<AsyncEvents data={props.events}/>
		<AsyncCustomers customers={props.customers}/>
		<AsyncAwards awards={props.awards}/>
	</Layout>
)}

export default HomePage

export const getStaticProps = async () => {
	const header = await fetch(process.env.API_SERVER + 'header')
	const navitems = await fetch(process.env.API_SERVER + 'navitems')
	const about = await fetch(process.env.API_SERVER + 'section/services')
	const activities = await fetch(process.env.API_SERVER + 'activities')
	const events = await fetch(process.env.API_SERVER + 'events/?page=1')
	const customers = await fetch(process.env.API_SERVER + 'customers')
	const awards = await fetch(process.env.API_SERVER + 'awards')
	const extraPosts = await fetch(process.env.API_SERVER + 'posts/extra')
	const contacts = await fetch(process.env.API_SERVER + 'contacts')
	const meta = await fetch(process.env.API_SERVER + 'metaseo/homepage')

	return {
		props: {
			header : await header.json(),
			navitems : await navitems.json(),
			meta : await meta.json(),
			about : await about.json(),
			activities : await activities.json(),
			events : await events.json(),
			customers : await customers.json(),
			awards : await awards.json(),
			contacts : await contacts.json(),
			posts : await extraPosts.json(),
		},
	}
}