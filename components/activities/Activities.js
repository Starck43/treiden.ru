import {memo} from "react"

import {Cover, Anchor} from "/components/UI"
import {Item} from "./Item"

import Background from "/public/images/bg-space.jpg"

import style from "./Activity.module.sass"


const Activities = ({activities}) => (
	<section className={style.section}>
		<Anchor id="activities"/>

		<Cover
			src={Background}
			alt="Виды деятельности"
			layout="fill"
			placeholder="blur"
			//priority
		/>
		<div className={style.activities}>
			{activities.map(activity =>
				<Item key={activity.slug} activity={activity}/>
			)}
		</div>
	</section>
)

export default memo(Activities)
