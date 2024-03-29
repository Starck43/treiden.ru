import {Fragment, memo} from "react"

import {Anchor, HtmlContent, Section, Header} from "/components/UI"

import style from "./About.module.sass"


const About = ({data}) => (
	<Section className={style.section}>
		<Anchor id="services"/>

		{data.map(item =>
			<Fragment key={item.slug}>
				<Header>
					{item.title}
				</Header>
				<HtmlContent id={item.slug} className={style.content}>
					{item.description}
				</HtmlContent>
			</Fragment>
		)}
	</Section>
)

export default memo(About)
