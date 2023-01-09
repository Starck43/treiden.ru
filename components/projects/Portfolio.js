import {memo} from "react"

import {Filter} from "./Filter"
import {List} from "./List"

import {Section, Header} from "/components/UI"


const Portfolio = ({categories, projects}) => (
	<Section>
		<Header>Портфолио</Header>
		<Filter categories={categories}/>
		<List projects={projects}/>
	</Section>
)


export default memo(Portfolio)
