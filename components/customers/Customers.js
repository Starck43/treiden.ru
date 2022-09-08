import React, {useState, useEffect} from "react"

import {Items} from "~/components/customers"
import {Section, Header} from "~/components/UI"
import Anchor from "~/components/UI/Anchor"
import {GridSlider} from "../UI/Slider"

import {useWindowDimensions} from "../../core/helpers/hooks"
import {convert2DimensionalArray} from "../../core/helpers/utils"

import style from "~/styles/customer.module.sass"

const SECTION = "customers"
const SECTION_TITLE = "Наши клиенты"


const Customers = ({customers}) => {
	const [groupedCustomers, setGroupedCustomers] = useState([])
	const {media, width} = useWindowDimensions()


	useEffect(() => {
		let groupCount = (media === "xs") ? 1 : (media === "sm") ? 2 : (media === "md") ? 3 : 4
		let groupedArray = convert2DimensionalArray(customers, groupCount)
		customers && setGroupedCustomers(groupedArray)
	}, [customers, media])

	return (
		groupedCustomers.length > 0 &&
		<Section className={style.section}>
			<Anchor id={SECTION}/>
			<Header>
				{SECTION_TITLE}
			</Header>
			<GridSlider
				groupKey={SECTION}
				itemLabel={SECTION_TITLE}
				showControls={width >= 576}
				showDots={groupedCustomers.length > 1}
			>
				{groupedCustomers.map((row, i) =>
					<div key={`row-${i}`} className="row">
						<Items customers={row}/>
					</div>
				)}
			</GridSlider>
		</Section>
	)
}

export default Customers
