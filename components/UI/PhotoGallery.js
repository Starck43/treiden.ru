import React, {createRef, useRef, useState} from "react"
import Image from "next/image"
import VideoPlayer from "./VideoPlayer"
import {HtmlContent} from "./HtmlContent"

import {useWindowDimensions} from "../../core/helpers/hooks"
import {createSrcSet, createThumbUrl, truncateHTML} from "../../core/helpers/utils"

import {Swiper, SwiperSlide} from "swiper/react"
import {EffectFade, Pagination, Keyboard, Zoom} from "swiper"

import "swiper/css"
import "swiper/css/zoom"
import "swiper/css/keyboard"
import "swiper/css/pagination"
import "swiper/css/effect-fade"

/*

const remoteLoader = ({src, width}) => {
	let breakpoints = [320, 450, 640, 768, 1080, 1200]
	if (breakpoints.indexOf(width) !== -1)
		return createThumbUrl(src, width)
	return src
}
*/

const PhotoGallery = ({
	                      title,
	                      excerpt,
	                      slides = [],
	                      current = 0,
	                      interval = 0,
	                      duration = 700,
	                      infinite = false,
	                      autoHeight = false,
	                      centered = false,
	                      responsive = null,
	                      layout = "fill",
	                      direction = "horizontal",
	                      effect = "fade",
	                      paginationType = "bullets",
	                      zoom = false,
	                      //freeScroll = false,
	                      objectFit = "contain",
	                      label = "slider",
	                      className = "",
	                      style = {},
	                      children = null
                      }) => {

	const carouselRef = useRef(null)
	const {width} = useWindowDimensions()
	const [currentIndex, setCurrentIndex] = useState(current)
	const [slideInterval, setSlideInterval] = useState(interval)
	const [sliderState, setSliderState] = useState(
		slides?.reduce((acc, value) => {
			acc[value.id] = {
				ref: createRef(),
				id: value.id,
				url: value?.url || null,
				loaded: 0,
				played: 0,
				playing: false,
				ended: false,
			}
			return acc
		}, {})
	)

	const [isLoaded, setLoaded] = useState(false)


	const loadComplete = function () {
		setLoaded(true)
	}

	const handlePrev = () => carouselRef.current?.swiper.slidePrev()

	const handleNext = () => carouselRef.current?.swiper.slideNext()


	const handleSlideInitialized = ({slides, activeIndex, autoplay}) => {
		// adding Zoom class to images' containers
		label === "lightbox" && slides.forEach(obj => {
			let img = obj.querySelector("img")
			img && img.parentElement.classList.add("swiper-zoom-target")
		})
		let currentSlider = sliderState[slides[activeIndex]?.id]
		if (currentSlider?.url) {
			autoplay?.stop()
			setSlideInterval(900)

			currentSlider.playing = true

			// save player's state
			setSliderState({
				...sliderState,
				[slides[activeIndex].id]: currentSlider,
			})
		}
	}


	const handleSlideChange = ({previousIndex, realIndex, autoplay}) => {
		setCurrentIndex(realIndex)

		let prev = infinite && previousIndex > 0 ? previousIndex - 1 : previousIndex
		let previousSlider = sliderState[slides[prev]?.id]
		// if prev slide is video
		if (previousSlider?.url) {
			previousSlider.playing = false
			previousSlider.ended && previousSlider.ref.current?.seekTo(0, "fraction")
			previousSlider.ended = false
			// save player's state : previous
			setSliderState({
				...sliderState,
				[slides[prev].id]: previousSlider,
			})
		}

		let nextSlider = sliderState[slides[realIndex]?.id]
		if (nextSlider?.url) {
			autoplay?.stop()
			setSlideInterval(900)
			nextSlider.playing = true

			// save player's state : next
			setSliderState({
				...sliderState,
				[slides[realIndex].id]: nextSlider,
			})
		} else {
			// drop slideshow interval to default for an image slide
			interval > 0 && setSlideInterval(interval)
		}
	}


	return (
		slides?.length > 0 || children
			? (<div className={`carousel-container ${label} ${className}`}>
					<Swiper
						ref={carouselRef}
						style={style}
						modules={[EffectFade, Pagination, Keyboard, Zoom]}
						initialSlide={current}
						longSwipes={false}
						keyboard
						pagination={{
							enabled: paginationType && slides.length > 1,
							clickable: true,
							dynamicBullets: true,
							hideOnClick: false,
							type: paginationType
						}}
						zoom={{
							enabled: zoom,
							maxRatio: 2.5
						}}
						effect={effect}
						speed={duration}
						autoplay={{
							enabled: Boolean(interval) && slides.length > 1,
							delay: slideInterval
						}}
						loop={infinite && slides.length > 1}
						direction={direction}
						breakpoints={responsive}
						centeredSlides={centered}
						grabCursor={slides.length > 1}
						watchOverflow
						autoHeight={autoHeight}
						//passiveListeners={false}
						onInit={handleSlideInitialized}
						onSlideChangeTransitionStart={handleSlideChange}
					>
						{children
							? children
							: slides.map((obj, i) => (
								<SwiperSlide
									key={i}
									style={label ==="slider" ? {backgroundImage: `url(${createThumbUrl(obj.file, 320)})`}: null}

								>
									{obj?.file &&
									<span className={`swiper-${zoom ? "zoom-" : ""}container`}>
										<Image
											//loader={remoteLoader}
											src={createThumbUrl(obj.file, 320)}
											srcset={createSrcSet(obj.file, [320, 450, 640, 768, 1080, 1200])}
											alt={obj?.alt}
											layout={layout}
											width={320}
											height={215}
											objectFit={objectFit}
											quality={80}
											//placeholder="blur"
											//blurDataURL={createThumbUrl(obj.file, 320)}
											onLoadingComplete={loadComplete}
											unoptimized
											className={isLoaded ? "loaded": ""}
										/>

											<figcaption>
												<h3 className="title">{obj.title || title}</h3>
												{width > 576 && <HtmlContent
													className="excerpt">{truncateHTML(obj.alt || excerpt, 500)}</HtmlContent>}
											</figcaption>
									</span>
									}
									{
										obj?.url
											? <VideoPlayer
												sliderRef={carouselRef.current?.swiper}
												id={obj.id}
												playerState={sliderState}
												setPlayerState={setSliderState}
											/>
											: null
									}
								</SwiperSlide>
							))
						}
					</Swiper>

					{label === "lightbox" &&
					<div className="swiper-fraction">
						<span>{currentIndex + 1}</span> / <span>{slides.length}</span>
					</div>
					}

					{
						width > 576 && slides.length > 1
							? (<>
									<div
										className={`swiper-control swiper-control-next ${!infinite && carouselRef.current?.swiper.isEnd || carouselRef.current?.swiper.zoom?.scale > 1 ? "disabled" : ""}`}
										onClick={handleNext}>
										<span className={`arrow right`}/>
									</div>
									<div
										className={`swiper-control swiper-control-prev ${!infinite && carouselRef.current?.swiper.isBeginning || carouselRef.current?.swiper.zoom?.scale > 1 ? "disabled" : ""}`}
										onClick={handlePrev}>
										<span className={`arrow left`}/>
									</div>
								</>
							) : null
					}
				</div>
			) : null
	)
}


export default PhotoGallery


