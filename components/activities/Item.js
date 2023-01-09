import {memo} from "react"
import Link from "next/link"
import {Col} from "react-bootstrap"

import style from "./Activity.module.sass"


export const Item = memo(({activity}) => (
	<Col xs={12} md={6}>

		<article className={style.activity}>
			<header className={style.header}>
				<h2 className={style.title}>
					{activity.name}
				</h2>
			</header>

			<p className={style.description}>
				{activity.excerpt}
			</p>

			<div className={style.footer}>
				<button>
					<Link href={`/projects/${activity.slug}`}><a>Перейти в раздел</a></Link>
				</button>
			</div>
		</article>

	</Col>
))

Item.displayName = "Item"
