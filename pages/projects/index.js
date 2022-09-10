import React from "react"

import Layout from "~/components/Layout"
import {Portfolio} from "~/components/projects"
//import Contacts from "~/components/contacts/Contacts"


const ProjectPage = ({navitems, categories, projects, posts, contacts}) => {
	return (
		<Layout navitems={navitems} contacts={contacts} posts={posts}>
			<Portfolio categories={categories} projects={projects}/>
		</Layout>
	)
}

export default ProjectPage


export const getStaticProps = async () => {
	const navitems = await fetch(process.env.API_SERVER + "navitems")
	const categories = await fetch(process.env.API_SERVER + "activities")
	const projects = await fetch(process.env.API_SERVER + "projects")
	const contacts = await fetch(process.env.API_SERVER + "contacts")
	const extraPosts = await fetch(process.env.API_SERVER + "posts/extra")

	return {
		props: {
			navitems: await navitems.json(),
			categories: await categories.json(),
			projects: await projects.json(),
			contacts: await contacts.json(),
			posts: await extraPosts.json(),
		},
		revalidate: 60 * 60 * 24,
	}
}
