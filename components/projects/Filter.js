import {memo} from "react"
import Link from "next/link"

import style from "./Projects.module.sass"


export const Filter = memo(({categories}) => (
	<div className={style.filter}>
		{categories.map(item =>
			<div className={style.filterItem} key={item.slug}>
				<Link href={`/projects/${item.slug}`}><a className={`${style.filterLink}`}>{item.name}</a></Link>
			</div>
		)}
	</div>
))

Filter.displayName = "Filter"
