import React from "react"

import Layout from "~/components/Layout"
import {PortfolioDetail} from "~/components/projects"


const ProjectPage = ({navitems, category, projects, contacts, posts}) => {

	return (
		<Layout navitems={navitems} contacts={contacts} posts={posts} meta={category.seo}>
			<PortfolioDetail category={category} projects={projects}/>
		</Layout>
	)
}

export default ProjectPage


export const getStaticPaths = async () => {
	const data = await fetch(process.env.API_SERVER + "activities")
	const categories = await data.json()

	const paths = categories.map(category => ({
		params: {slug: category.slug},
	}))

	return {paths, fallback: false}
}


export const getStaticProps = async ({params}) => {
	const navitems = await fetch(process.env.API_SERVER + "navitems")
	const category = await fetch(process.env.API_SERVER + "activities/" + params.slug)
	const projects = await fetch(process.env.API_SERVER + "projects/" + params.slug)
	const contacts = await fetch(process.env.API_SERVER + "contacts")
	const extraPosts = await fetch(process.env.API_SERVER + "posts/extra")

	return {
		props: {
			navitems: await navitems.json(),
			category: await category.json(),
			projects: await projects.json(),
			posts: await extraPosts.json(),
			contacts: await contacts.json(),
		},
		revalidate: 60 * 60 * 24,
	}
}