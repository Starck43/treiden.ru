import {memo} from "react"
import {Item} from "~/components/services"
import getConfig from "next/config"

import {Cover, Anchor} from "../UI"

import style from "~/styles/activity.module.sass"


const {publicRuntimeConfig} = getConfig() //next.config.js

const Activities = ({activities}) => (
	<section className={style.section}>
		<Anchor id="activities"/>

		<Cover
			src={publicRuntimeConfig.bgImage}
			alt="Виды деятельности"
			layout="fill"
			priority
		/>
		<div className={style.activities}>
			{activities.map(activity =>
				<Item key={activity.slug} activity={activity}/>
			)}
		</div>
	</section>
)

export default memo(Activities)
