import {Fragment, memo, useEffect, useState} from "react"
import {Card} from "react-bootstrap"

import {Cover, LightBox, Icon} from "/components/UI"

import style from "./Projects.module.sass"


export const Item = memo(({project}) => {
	const [showModal, setShowModal] = useState(false)
	const [slides, setSlides] = useState([])

	useEffect(() => {
		let arr = []
		if (project.portfolio?.length === 0) {
			arr.push({...project, file: project.cover})
		} else {
			arr = project?.url ? [{...project, id: 0}].concat(project.portfolio) : [...project.portfolio]
		}
		setSlides(arr)
	}, [project])


	return (
		<Fragment>
			<Card id={`project-${project.id}`} className={`${style.card} ratio ratio-1x1`}
			      onClick={() => setShowModal(true)}>
				{project.cover &&
				<Cover
					src={project.cover}
					alt={project?.title}
					sizes={[320, 450, 640, 768, 1080, 1200]}
					layout="fill"
					width={320}
					height={320}
				/>
				}
				<Card.ImgOverlay className={style.overlay}>
					<header className={style.title}>
						<h4>{project.title}</h4>
					</header>
					<p>{project.excerpt}</p>
					{project.url &&
					<Icon name="play" className={`${style.play} centered`}/>
					}
				</Card.ImgOverlay>
			</Card>

			{showModal &&
			<LightBox
				slides={slides}
				title={project?.title}
				excerpt={project?.description || project?.excerpt}
				show={showModal}
				handleClose={() => setShowModal(!showModal)}
			/>
			}
		</Fragment>
	)
})

Item.displayName = "Item"
