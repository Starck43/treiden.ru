import Image from "next/image"
import Link from "next/link"

import {createThumbUrl} from "~/core/helpers/utils"

import style from "~/styles/events.module.sass"


const SLUG = "event"

const remoteLoader = ({src, width}) => {
	let breakpoints = [320, 450, 640, 768, 1080, 1200]
	if (breakpoints.indexOf(width) !== -1)
		return createThumbUrl(src, width)
	return src
}


const Item = ({item, mainColumn=false}) => {
	return (
		<article id={`${SLUG}-${item.id}`} className={`card ${style.article}`}>
			<Link href={`/${SLUG}/${item.id}`}><a className={style.cover}>
				{item.cover &&
				<Image
					className={style.image}
					loader={remoteLoader}
					src={item.cover}
					alt={item.title}
					layout="responsive"
					objectFit="cover"
					width={576}
					height={320}
					quality={80}
				/>
				}
			</a></Link>
			<div className={`event-meta ${style.body}`}>
				<h2 className={`post-title ${style[mainColumn ? "mainTitle" : "secondTitle"]}`}>
					<Link href={`/${SLUG}/${item.id}`}><a>{item.title}</a></Link>
				</h2>
				<p className={`card-text`}>{item.excerpt}</p>
				<p className={`card-date ${style.date}`}>{item.date}</p>
			</div>

		</article>
	)
}


export default Item


