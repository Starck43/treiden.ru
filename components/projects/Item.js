import React, {Fragment, useEffect, useState} from "react"
import Image from "next/image"

import {Icon} from "~/components/UI"
import {createThumbUrl} from "~/core/helpers/utils"

import {Card} from "react-bootstrap"

import style from "~/styles/portfolio.module.sass"
import LightBox from "../UI/LightBox"


const remoteLoader = ({src, width}) => {
	let breakpoints = [320, 450, 640, 768, 1080, 1200]
	if (breakpoints.indexOf(width) !== -1)
		return createThumbUrl(src, width)
	return src
}


const Item = ({project}) => {
	const [showModal, setShowModal] = useState(false)
	const [slides, setSlides] = useState([])

	useEffect(() => {
		let arr = []
		if (project.portfolio.length === 0) {
			arr.push({...project, file: project.cover})
		} else {
			arr = project.url ? [{...project, id: 0}].concat(project.portfolio) : [...project.portfolio]
		}
		setSlides(arr)
	}, [project])


	return (
		<Fragment>
			<Card id={`project-${project.id}`} className={`${style.card} ratio ratio-1x1`}
			      onClick={() => setShowModal(true)}>
				{project.cover &&
				<Image
					loader={remoteLoader}
					src={project.cover}
					alt={project.title}
					layout="fill"
					objectFit="cover"
					width={320}
					height={320}
					quality={80}
				/>
				}
				<Card.ImgOverlay className={style.overlay}>
					<header className={style.title}><h4>{project.title}</h4></header>
					<p>{project.excerpt}</p>
					{project.url && <Icon name="play" className={`${style.play} centered`}/>}
				</Card.ImgOverlay>
			</Card>

			{showModal &&
			<LightBox
				slides={slides}
				title={project.title}
				excerpt={project.description || project.excerpt}
				show={showModal}
				handleClose={() => setShowModal(!showModal)}
			/>
			}
		</Fragment>
	)
}

export default Item
