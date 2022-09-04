import React from "react"

import {Section, Header} from "~/components/UI"
import {List, Filter} from "~/components/projects"


const Portfolio = ({categories, projects}) => {
	return (
		<Section>
			<Header>Портфолио</Header>
			<Filter categories={categories}/>
			<List projects={projects}/>
		</Section>
	)
}

export default Portfolio
