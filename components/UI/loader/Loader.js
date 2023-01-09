import React from 'react'

import style from "./Loader.module.sass"

const Loader = () => (
	<div className={style.overlay} >
		<div className={style.loader}/>
	</div>
)


export default Loader
