import {memo} from "react"
import Link from "next/link"
import {Cover} from "/components/UI"

import style from "./Events.module.sass"


const SLUG = "event"


export const Item = memo(({item, mainColumn = false}) => {
	return (
		<article id={`${SLUG}-${item.id}`} className={`card ${style.article}`}>
			<Link href={`/${SLUG}/${item.id}`} passHref>
				<a className={style.cover}>
					{item?.cover &&
					<Cover
						src={item.cover}
						alt={item?.title}
						sizes={[320, 450, 640, 768, 1080, 1200]}
						width={576}
						height={320}
						className={style.image}
					/>
					}
				</a>
			</Link>

			<div className={`event-meta ${style.body}`}>
				<h2 className={`post-title ${style[mainColumn ? "mainTitle" : "secondTitle"]}`}>
					<Link href={`/${SLUG}/${item.id}`} passHref><a>{item.title}</a></Link>
				</h2>
				<p className={`card-text`}>{item.excerpt}</p>
				<p className={`card-date ${style.date}`}>{item.date}</p>
			</div>

		</article>
	)
})

Item.displayName = "Item"
