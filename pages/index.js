import {useEffect} from "react"
import {useRouter} from "next/router"
import Layout from '~/components/Layout'
import Header from "../components/header/Header"
import {About, Activities} from "../components/services"
import Events from "../components/events/Events"
import Customers from "../components/customers/Customers"
import Awards from "../components/awards/Awards"

import {smoothScroll} from "../core/helpers/utils"
//import dynamic from 'next/dynamic'

/*

const AsyncHeader = dynamic(() => import('~/components/header/Header'))
const AsyncAbout = dynamic(() => import('~/components/services').then((mod) => mod.About))
const AsyncActivities = dynamic(() => import('~/components/services').then((mod) => mod.Activities))
const AsyncEvents = dynamic(() => import('~/components/events/Events'))
const AsyncCustomers = dynamic(() => import('~/components/customers/Customers'))
const AsyncAwards = dynamic(() => import('~/components/awards/Awards'))
*/


const HomePage = ({...props}) => {
	const router = useRouter()

	useEffect(() => {
		const hash = router.asPath.replace("/", "")
		console.log(router.asPath)
		router.replace(router.pathname)

		setTimeout(() => {
			let el = hash && typeof window !== "undefined" ? document.querySelector(hash) : null
			el && smoothScroll(el, 40)
		}, 100)

		return () => clearTimeout()

	}, [router.asPath])

	return(
	<Layout navitems={props.navitems} contacts={props.contacts} extra={props.extra} meta={props.meta[0]} >
		<Header extra={props.extra} slides={props.header}/>
		<About data={props.about}/>
		<Activities activities={props.activities}/>
		<Events data={props.events}/>
		<Customers customers={props.customers}/>
		<Awards awards={props.awards}/>
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
			extra : await extraPosts.json(),
		},
		revalidate: 60 * 60 * 24,
	}
}
