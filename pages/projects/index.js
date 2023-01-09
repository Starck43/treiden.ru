import dynamic from 'next/dynamic'

import Layout from "/components/Layout"
import Loader from "../../components/UI/loader/Loader"

const DynamicPortfolio = dynamic(() => import('/components/portfolio').then((mod) => mod.Portfolio), {
	loading: () => <Loader />,
	ssr: false,
})

const ProjectPage = ({categories, projects}) => {
	return (
		<Layout>
			<DynamicPortfolio categories={categories} projects={projects}/>
		</Layout>
	)
}

export default ProjectPage


export const getStaticProps = async () => {
	const categories = await fetch(process.env.API_SERVER + "activities")
	const projects = await fetch(process.env.API_SERVER + "projects")

	return {
		props: {
			categories: await categories.json(),
			projects: await projects.json(),
		},
		revalidate: 60 * 60 * 24,
	}
}
