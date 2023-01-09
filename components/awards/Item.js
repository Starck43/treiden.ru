import {memo} from "react"

import Cover from "/components/UI/cover/Cover"

import style from "./Awards.module.sass"


export const Item = memo(({award}) => {
	return (
		award.file &&
		<figure id={award.id} className={style.cover}>
			<Cover
				src={award.file}
				sizes={[320, 450, 640]}
				alt={award?.title}
				layout="intrinsic"
				width={320}
				height={450}
			/>
		</figure>
	)
})

Item.displayName = "Item"
