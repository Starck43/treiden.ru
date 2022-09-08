import React, {Fragment, useState} from "react"
import Image from "next/image"
import LightBox from "../UI/LightBox"

import {createThumbUrl} from "~/core/helpers/utils"

import style from "~/styles/awards.module.sass"


const remoteLoader = ({src, width}) => {
	let breakpoints = [320, 450, 640]
	if (breakpoints.indexOf(width) !== -1)
		return createThumbUrl(src, width)
	return src
}


const Items = ({awards}) => {

	const [awardIndex, setAwardIndex] = useState(0)
	const [showModal, setShowModal] = useState(false)


	const handleClick = (e) => {
		let el = e.currentTarget
		let index = [...el.parentElement.children].indexOf(el)
		setAwardIndex(index)
		setShowModal(true)
	}

	return (
		<Fragment>
			{awards.map(award => (
				<figure
					id={award.id}
					key={award.year}
					className={`col-6 col-sm-4 col-md-3 ${style.figure}`}
					onClick={handleClick}
				>
					{award.file &&
					<Image className={style.cover}
					       loader={remoteLoader}
					       src={award.file}
					       alt={award.title}
					       layout="intrinsic"
					       width={320}
					       height={450}
					       quality={80}
					/>
					}
				</figure>
			))}
			{showModal &&
			<LightBox
				slides={awards}
				show={showModal}
				currentSlide={awardIndex}
				handleClose={() => setShowModal(!showModal)}
			/>
			}
			
		</Fragment>
	)
}

export default Items



