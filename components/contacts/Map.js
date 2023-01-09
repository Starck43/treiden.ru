import {memo} from "react"
import {Cover} from "/components/UI"

import style from "./Contacts.module.sass"


export const Map = memo(({image}) => (
	<div className={`map ${style.rightBlock} centered`} id="map">
		<Cover
			src={image}
			alt="Геолокация"
			sizes={[320, 640]}
			layout="intrinsic"
			width={320}
			height={180}
		/>
	</div>
))

Map.displayName = "Map"
