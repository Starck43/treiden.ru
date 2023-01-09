import {useEffect} from "react"
import {useRouter} from "next/router"

import Layout from '/components/Layout'
import Header from "/components/header/Header"
import {About} from "/components/about"
import {Activities} from "/components/activities"
import {Events} from "/components/events"
import {Customers} from "/components/customers"
import {Awards} from "/components/awards"

import {smoothScroll} from "/core/helpers/utils"


const HomePage = ({...props}) => {
	const router = useRouter()

	useEffect(() => {
		const hash = router.asPath.replace("/", "")
		router.replace(router.pathname)

		setTimeout(() => {
			const el = hash && typeof window !== "undefined" && document.querySelector(hash)
			el && smoothScroll(el, 40)
		}, 200)

		return () => clearTimeout()
		/* react-hooks/exhaustive-deps */
	}, [])

	return(
	<Layout meta={props.meta[0]} >
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
	const about = await fetch(process.env.API_SERVER + 'section/services')
	const activities = await fetch(process.env.API_SERVER + 'activities')
	const events = await fetch(process.env.API_SERVER + 'events/?page=1')
	const customers = await fetch(process.env.API_SERVER + 'customers')
	const awards = await fetch(process.env.API_SERVER + 'awards')
	const meta = await fetch(process.env.API_SERVER + 'metaseo/homepage')

	return {
		props: {
			meta : await meta.json(),
			header : await header.json(),
			about : await about.json(),
			activities : await activities.json(),
			events : await events.json(),
			customers : await customers.json(),
			awards : await awards.json(),
		},
		revalidate: 60 * 60 * 24,
	}
}
