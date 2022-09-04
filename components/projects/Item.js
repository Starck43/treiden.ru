import React, {useEffect, useState} from "react"
import styled from "styled-components/macro"
import Image from "next/image"

import {Icon} from "~/components/UI"
import {createThumbUrl} from "~/core/helpers/utils"

import {Card} from "react-bootstrap"
import LightBox from "fslightbox-react"

import style from "~/styles/portfolio.module.sass"


const remoteLoader = ({src, width}) => {
	let breakpoints = [320, 450, 640, 768, 1080, 1200]
	if (breakpoints.indexOf(width) !== -1)
		return createThumbUrl(src, width)
	return src
}


const Item = (props) => {
	const [viewerIsOpen, setViewerIsOpen] = useState(false)
	const [currentImage, setCurrentImage] = useState(0)
	const [images, setImages] = useState((props.url) ? [props.url] : [])
	const [types, setTypes] = useState((props.url) ? ["youtube"] : [])

	useEffect(()=>{
		setImages(images.concat(props.portfolio.length ? props.portfolio.map(obj => (obj.file)) : [props.cover]))
		setTypes(types.concat(props.portfolio.length ? props.portfolio.map(_ => ("image")) : ["image"]))
	},[])


	const openLightbox = (event) => {
		let el = event.target.parentElement.parentElement
		let index = [...el.parentElement.children].indexOf(el)
		setCurrentImage(index)
		setViewerIsOpen(!viewerIsOpen)
	}

	return (
		<Portfolio>
			<Card id={`project-${props.id}`} className={style.card} onClick={openLightbox}>
				<Image
					loader={remoteLoader}
					src={props.cover}
					alt={props.title}
					layout="responsive"
					width={320}
					height={320}
					quality={80}
				/>
				<Card.ImgOverlay className={style.overlay}>
					<header className={style.title}><h4>{props.title}</h4></header>
					<p>{props.excerpt}</p>
				</Card.ImgOverlay>
				{props.url && <Icon name="play" className={`${style.play} centered`}/>}
			</Card>

			<LightBox
				sources={images}
				types={types}
				sourceIndex={currentImage}
				toggler={viewerIsOpen}
			/>
		</Portfolio>
	)
}

export default Item


const Portfolio = styled.div`
	.fslightbox-container {
		.fslightbox-toolbar {
			background: transparent;
		}

		.fslightbox-nav {
			height: 4em;
		}

		.fslightbox-toolbar-button, .fslightbox-slide-btn {
			padding: 0;
			font-size: unset;
			width: 4em;
			height: 4em;
			border-radius: 5px;
		}

		.fslightbox-slide-btn-container .fslightbox-slide-btn {
			svg {
				display: none;
			}

			&::after {
				font-family: 'ip';
				color: white;
				font-size: 2rem;
				transition: all 200ms ease;
				opacity: 0.5;
			}

			&:hover:after {
				opacity: 1;
			}
		}

		.fslightbox-slide-btn-previous-container .fslightbox-slide-btn {
			&::after {
				content: '\\e810';
			}
		}

		.fslightbox-slide-btn-next-container .fslightbox-slide-btn {
			&::after {
				content: '\\e811';
			}
		}

		svg {
			min-width: 1.5em;
			min-height: 1.5em;
			pointer-events: none;
		}

		.fslightbox-toolbar-button:first-child {
			display: none;
		}

	}
`

