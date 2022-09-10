import {Cover} from "../UI"

import style from "~/styles/contacts.module.sass"


const Map = ({image}) => (
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
)

export default Map
