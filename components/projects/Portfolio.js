import {List, Filter} from "~/components/projects"
import {Section, Header} from "~/components/UI"


const Portfolio = ({categories, projects}) => (
	<Section>
		<Header>Портфолио</Header>
		<Filter categories={categories}/>
		<List projects={projects}/>
	</Section>
)


export default Portfolio
