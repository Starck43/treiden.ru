import React from 'react'

import Layout from '~/components/Layout'
import { Portfolio } from '~/components/projects'
import Contacts from '~/components/contacts/Contacts'


const ProjectPage = ({navitems, categories, projects, extraPosts, contacts}) => {

	return(
	<Layout navitems={navitems} contacts={contacts}>
		<Portfolio categories={categories} projects={projects} />
		<Contacts contacts={contacts} posts={extraPosts} />
	</Layout>
)}

export default ProjectPage


export const getStaticProps = async () => {
	const navitems = await fetch(process.env.API_SERVER + 'navitems')
	const categories = await fetch(process.env.API_SERVER + 'activities')
	const projects = await fetch(process.env.API_SERVER + 'projects')
	const contacts = await fetch(process.env.API_SERVER + 'contacts')
	const extraPosts = await fetch(process.env.API_SERVER + 'posts/extra')

	return {
		props: {
			navitems : await navitems.json(),
			categories : await categories.json(),
			projects : await projects.json(),
			contacts : await contacts.json(),
			extraPosts : await extraPosts.json(),
		},
	}
}
