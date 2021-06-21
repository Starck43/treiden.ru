import React from 'react'

import Layout from '~/components/Layout'
import { PortfolioDetail } from '~/components/projects'
import Contacts from '~/components/contacts/Contacts'


const ProjectPage = ({navitems, category, projects, extraPosts, contacts}) => {

	return(
	<Layout navitems={navitems} contacts={contacts} meta={category.seo}>
		<PortfolioDetail category={category} projects={projects}/>
		<Contacts contacts={contacts} posts={extraPosts} />
	</Layout>
)}

export default ProjectPage


export const getStaticPaths = async () => {
	const data = await fetch(process.env.API_SERVER + 'activities')
	const categories = await data.json()

	const paths = categories.map((category) => ({
		params: { slug: category.slug },
	}))

	return { paths, fallback: false }
}


export const getStaticProps = async ({params}) => {
	const navitems = await fetch(process.env.API_SERVER + 'navitems')
	const category = await fetch(process.env.API_SERVER + 'activities/'+params.slug)
	const projects = await fetch(process.env.API_SERVER + 'projects/'+params.slug)
	const contacts = await fetch(process.env.API_SERVER + 'contacts')
	const extraPosts = await fetch(process.env.API_SERVER + 'posts/extra')

	return {
		props: {
			navitems : await navitems.json(),
			category : await category.json(),
			projects : await projects.json(),
			extraPosts : await extraPosts.json(),
			contacts : await contacts.json(),
		},
	}
}