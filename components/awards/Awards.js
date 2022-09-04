import React, {useState, useEffect} from "react"

import {Items} from "~/components/awards"
import {Section, Header} from "~/components/UI"
import Anchor from "~/components/UI/Anchor"
import {GridSlider} from "../UI/Slider"

import {useWindowDimensions} from "../../core/helpers/hooks"
import {convert2DimensionalArray} from "../../core/helpers/utils"

import style from "~/styles/awards.module.sass"


const SECTION = "awards"
const SECTION_TITLE = "Наши награды"


const Awards = ({awards}) => {
	const [groupedAwards, setGroupedAwards] = useState([])
	const {media, width} = useWindowDimensions()


	useEffect(() => {
		let groupCount = (media === "xs") ? 1 : (media === "sm") ? 2 : (media === "md") ? 3 : 4
		let groupedArray = convert2DimensionalArray(awards, groupCount)
		awards && setGroupedAwards(groupedArray)
	}, [media])

	return (
		groupedAwards.length > 0 &&
		<Section className={style.section}>
			<Anchor id={SECTION}/>
			<Header>
				{SECTION_TITLE}
			</Header>
			<GridSlider
				groupKey={SECTION}
				itemLabel={SECTION_TITLE}
				showControls={width >= 576}
				showDots={groupedAwards.length > 1}
			>
				{groupedAwards.map((row, i) =>
					<div key={`row-${i}`} className="row">
						<Items awards={row}/>
					</div>
				)}
			</GridSlider>
		</Section>
	)
}

export default Awards
