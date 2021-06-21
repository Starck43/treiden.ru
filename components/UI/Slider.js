import React, { Fragment } from 'react'
import styled from 'styled-components/macro'
import Link from 'next/link'
import Image from 'next/image'

import { getLinkType } from '~/core/helpers/utils'

import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import style from "~/styles/slider.module.sass"


const remoteLoader = ({ src }) => {
	return src
}

const Slider = ({sliders, className, ...sliderProps}) => {
	const onClick = (e) => {
		// Остановим все click события вверх по дереву
		e.stopPropagation()
	}

	return (
	<Container {...sliderProps} className={className || style.sliderBg}
		showStatus={false}
		useKeyboardArrows
		animationHandler="fade"
		preventMovementUntilSwipeScrollTolerance={true}
		labels={{leftArrow: 'Назад', rightArrow: 'Вперед', item: 'Слайд'}}
		renderArrowPrev={(onClickHandler, hasPrev, label) =>
			hasPrev && <div className={`arrow ${style.arrow} ${style.arrowLeft}`} onClick={onClickHandler} title={label}></div>
		}
		renderArrowNext={(onClickHandler, hasNext, label) =>
			hasNext && <div className={`arrow right ${style.arrow} ${style.arrowRight}`} onClick={onClickHandler} title={label}></div>
		}
		renderThumbs={(children) => children.map((item, index) => {
			let obj = sliders[index]
			let link = getLinkType(obj.url)
			let url = link.type == 'link' ? obj.url : `/projects/${obj.slug}`
			return (
				<Fragment>
					<svg className={`${style.icon} check-mark svg-icon white mx-2`}><use xlinkHref="#check-mark-icon"></use></svg>
					<Link key={obj.slug} shallow={true} href={url}><a onClick={onClick}>{obj.name}</a></Link>
				</Fragment>
			)
		})}
		renderIndicator={(onClickHandler, isSelected, index, label) =>
			sliders.length > 1 && <li className={`dot ${isSelected ? 'selected' : ''}`} onClick={onClickHandler} role="button" tabIndex="0" aria-label={label} value={index}></li>
		}
	>
		{ sliders.map((obj, index) => (
			<Fragment key={index}>
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
			margin: 4vh;
			z-index: 1;
			ul {
				display: flex;
				flex-direction: column;
				margin-bottom: 0;
				padding: 0;
				transform: none !important;
				li {
					width: auto !important;
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



