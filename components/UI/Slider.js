import React, { Fragment } from 'react'
import styled from 'styled-components/macro'
import Link from 'next/link'
import Image from 'next/image'

import { getLinkType, createThumbUrl } from '~/core/helpers/utils'

import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import style from "~/styles/slider.module.sass"



const remoteLoader = ({ src, width }) => {
	let breakpoints = [320, 450, 640, 768, 1080, 1200]
	if (breakpoints.indexOf(width) !== -1)
		return createThumbUrl(src, width)
	return src
}


const Slider = ({sliders, className, groupKey='', ...sliderProps}) => {
	const onClick = (e) => {
		// Остановим все click события вверх по дереву
		e.stopPropagation()
	}

	return (
	<Container {...sliderProps} className={className || style.sliderBg}
		showStatus={false}
		autoFocus={false}
		useKeyboardArrows
		animationHandler="fade"
		preventMovementUntilSwipeScrollTolerance={true}
		labels={{leftArrow: 'Назад', rightArrow: 'Вперед', item: 'Слайд'}}
		renderArrowPrev={(onClickHandler, hasPrev, label) =>
			hasPrev && <div className={`arrow left ${style.arrow}`} onClick={onClickHandler} title={label}></div>
		}
		renderArrowNext={(onClickHandler, hasNext, label) =>
			hasNext && <div className={`arrow right ${style.arrow}`} onClick={onClickHandler} title={label}></div>
		}
		renderThumbs={(children) => children.map((item, index) => {
			let obj = sliders[index]
			let link = getLinkType(obj.url) //external or internal link
			let url = link.type == 'link' ? obj.url : `/projects/${obj.slug}`
			return (
				<Fragment key={index}>
					<svg className={`${style.icon} check-mark svg-icon white mx-2`}><use xlinkHref="#check-mark-icon"></use></svg>
					<Link key={obj.slug} shallow={true} href={url}><a onClick={onClick}>{obj.name}</a></Link>
				</Fragment>
			)
		})}
		renderIndicator={(onClickHandler, isSelected, index, label) =>
			sliders.length > 1 && <li className={`dot ${isSelected ? 'selected' : ''}`} onClick={onClickHandler} role="button" tabIndex="0" aria-label={label} value={index}></li>
		}
	>
		{ sliders.map((obj) => (
			<Fragment key={`${groupKey}-${obj.id}`}>
				<Image
					className={style.image}
					loader={remoteLoader}
					src={obj.cover || obj.file}
					alt={obj.title}
					layout="responsive"
					objectFit="cover"
					width={320}
					height={180}
					quality={80}
				/>
				{ sliderProps.showTitle && (
					<p className='legend'>{obj.title}</p>
				)}
			</Fragment>
		))}
	</Container>
	)
}


export default Slider



const Container = styled(Carousel)`
	height: 100%;
	.carousel-slider{
		height: 100%;
	}
	.carousel{
		.slider-wrapper, ul.slider{
			height: 100%;
		}
		.control-arrow{
			display: none;
		}
		.thumbs-wrapper {
			position: absolute;
			bottom: 0;
			margin: 2vw calc(1rem + 2vh);
			z-index: 1;
			ul {
				display: flex;
				flex-direction: column;
				margin-bottom: 0;
				padding: 0;
				transform: none !important;
				li {
					width: auto !important;
					padding: 0;
					border: none;
					font-weight: bold;
					text-transform: uppercase;
					text-shadow: 1px 2px 4px rgba(0,0,0, 0.8);
					.check-mark{
						visibility: hidden;
					}
					a{
						color: white;
						opacity: 0.7;
					}
					&.selected {
						.check-mark{
							visibility: visible;
						}
						a{
							opacity: 1;
						}
					}
				}
			}
		}
	}
`



