import {createRef, useRef, useState} from "react"
import Link from "next/link"
import {Swiper, SwiperSlide} from "swiper/react"
import {EffectFade, Pagination, Keyboard, Autoplay, FreeMode, Zoom} from "swiper"

import VideoPlayer from "./VideoPlayer"
import Cover from "./Cover"
import HtmlContent from "./HtmlContent"
import {SvgIcon} from "./Icon"

import {useWindowDimensions} from "../../core/helpers/hooks"
import {createThumbUrl, getLinkType, truncateHTML} from "../../core/helpers/utils"

import "swiper/css"
import "swiper/css/zoom"
import "swiper/css/keyboard"
import "swiper/css/pagination"
import "swiper/css/effect-fade"


const Slider = ({
	                title,
	                excerpt,
	                slides = [],
	                current = 0,
	                interval = 0,
	                duration = 700,
	                infinite = false,
	                layout = "fill",
	                paginationType = "bullets",
	                zoom = false,
	                freeScroll = false,
	                objectFit = "contain",
	                responsive = null,
	                navigationController = false,
	                label = "slider",
	                className = "",
	                style = {},
	                children = null,
	                ...props
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
			? (<div className={`${label} ${className}`}>
					<Swiper
						ref={carouselRef}
						style={style}
						modules={[EffectFade, Pagination, Keyboard, Autoplay, FreeMode, Zoom]}
						initialSlide={current}
						keyboard
						pagination={{
							enabled: paginationType && slides.length > 1,
							clickable: true,
							dynamicBullets: false,
							hideOnClick: false,
							type: paginationType
						}}
						zoom={{
							enabled: zoom,
							maxRatio: 2.5
						}}
						speed={width >= 992 ? duration : duration * width / 1000}
						autoplay={{
							enabled: Boolean(interval) && slides.length > 1,
							delay: slideInterval
						}}
						freeMode={{
							enabled: freeScroll,
							sticky: true,
						}}
						loop={infinite && slides.length > 1}
						breakpoints={responsive}
						longSwipes={false}
						spaceBetween={responsive ? width * 0.02 : 0}
						grabCursor={slides.length > 1}
						watchOverflow
						onInit={handleSlideInitialized}
						onSlideChangeTransitionStart={handleSlideChange}
						{...props}
					>
						{children
							? children
							: slides.map(obj =>
								<SwiperSlide
									key={`slide-${obj.id}`}
									style={label === "slider" ? {backgroundImage: `url(${createThumbUrl(obj.file, 320)})`} : null}
								>
									{obj?.file &&
									<span className={`swiper-${zoom ? "zoom-" : ""}container`}>
										<Cover
											src={obj.file}
											sizes={[320, 450, 640, 768, 1080, 1200]}
											alt={obj?.alt}
											layout={layout}
											width={320}
											height={215}
											objectFit={objectFit}
										/>
											<figcaption>
												<h3 className="title">{obj.title || title}</h3>
												{width > 576 &&
												<HtmlContent
													className="excerpt">{truncateHTML(obj.alt || excerpt, 500)}
												</HtmlContent>
												}
											</figcaption>
									</span>
									}

									{obj?.url
										? <VideoPlayer
											sliderRef={carouselRef.current?.swiper}
											id={obj.id}
											playerState={sliderState}
											setPlayerState={setSliderState}
										/>
										: null
									}
								</SwiperSlide>
							)}
					</Swiper>

					{navigationController &&
					<ul className="external-navigation">
						{slides.map((obj, index) => {
							return (
								<li
									key={`navlink-${obj.id}`}
									style={{transitionDuration: duration + "ms"}}
									className={`nav-link ${currentIndex === index ? "active" : ""}`}
								>
									<SvgIcon id="#check-mark-icon" className={`arrow arrow-left`}/>

									<Link
										key={obj.slug}
										href={getLinkType(obj.url).type === "link" ? obj.url : `/projects/${obj.slug}`}
										passHref
									>
										<a>{obj.name}</a>
									</Link>
								</li>
							)
						})}
					</ul>
					}

					{label === "lightbox" &&
					<div className="swiper-fraction">
						<span>{currentIndex + 1}</span> / <span>{slides.length}</span>
					</div>
					}

					{width > 576 && slides.length > 1
						? (<>
								<div
									className={`swiper-control swiper-control-next ${!infinite && carouselRef.current?.swiper.isEnd || carouselRef.current?.swiper.zoom?.scale > 1 ? "disabled" : ""}`}
									onClick={handleNext}>
									<SvgIcon id="#check-mark-icon" className={`arrow arrow-right`}/>
								</div>
								<div
									className={`swiper-control swiper-control-prev ${!infinite && carouselRef.current?.swiper.isBeginning || carouselRef.current?.swiper.zoom?.scale > 1 ? "disabled" : ""}`}
									onClick={handlePrev}>
									<SvgIcon id="#check-mark-icon" className={`arrow arrow-left`}/>
								</div>
							</>
						) : null
					}
				</div>
			) : null
	)
}


export default Slider


