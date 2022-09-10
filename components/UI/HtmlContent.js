const HtmlContent = ({children, className}) => (
	<div className={className} dangerouslySetInnerHTML={{__html: children}}/>
)

export default HtmlContent