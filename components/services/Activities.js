import {memo} from "react"
import {Item} from "~/components/services"
import {Cover, Anchor} from "../UI"

import getConfig from "next/config"

const {publicRuntimeConfig} = getConfig() //next.config.js

import style from "~/styles/activity.module.sass"


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
