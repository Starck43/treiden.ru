import {Container} from "react-bootstrap"

const Section = ({id, className="", children}) => (
	<section id={id} className={`py-4 ${className}`}>
		<Container>
			{children}
		</Container>
	</section>
)


export default Section