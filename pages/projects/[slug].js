import dynamic from "next/dynamic"

import Layout from "/components/Layout"
import Loader from "/components/UI/loader/Loader"

const DynamicPortfolioDetail = dynamic(() => import('/components/portfolio').then((mod) => mod.PortfolioDetail), {
	loading: () => <Loader />,
	ssr: false,
})

const ProjectPage = ({category, projects}) => {

	return (
		<Layout meta={category?.seo}>
			<DynamicPortfolioDetail category={category} projects={projects}/>
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
	const category = await fetch(process.env.API_SERVER + "activities/" + params.slug)
	const projects = await fetch(process.env.API_SERVER + "projects/" + params.slug)

	return {
		props: {
			category: await category.json(),
			projects: await projects.json(),
		},
		revalidate: 60 * 60 * 24,
	}
}
