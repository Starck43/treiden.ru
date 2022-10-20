import {Fragment, memo, useState} from "react"
import {SwiperSlide} from "swiper/react"

import Item from "../customers/Item"
import {LightBox, Slider, Anchor, Section, Header} from "~/components/UI"

import style from "~/styles/awards.module.sass"

const SECTION = "awards"
const SECTION_TITLE = "Наши награды"


const Awards = ({awards}) => {
	const [currentIndex, setCurrentIndex] = useState(0)
	const [showModal, setShowModal] = useState(false)

	const openLightbox = (e) => {
		let el = e.currentTarget
		let index = [...el.parentElement.children].indexOf(el)
		setCurrentIndex(index)
		setShowModal(true)
	}

	return (
		<Fragment>
			{awards.length > 0 &&
			<Section className={style.section}>
				<Anchor id={SECTION}/>
				<Header>
					{SECTION_TITLE}
				</Header>

				<Slider
					slides={awards}
					duration={300}
					slidesPerView={2}
					freeScroll
					responsive={{
						576: {
							slidesPerView: 3,
						},
						992: {
							slidesPerView: 4,
						},
						1200: {
							slidesPerView: 5,
						}
					}}
					className="awards-slider with-outside-controls"
				>
					{awards.map(award =>
						<SwiperSlide className={`${style.article}`} key={`award-${award.id}`} onClick={openLightbox}>
							<Item award={award}/>
						</SwiperSlide>
					)}
				</Slider>
			</Section>
			}

			{showModal &&
			<LightBox
				slides={awards}
				show={showModal}
				currentSlide={currentIndex}
				handleClose={() => setShowModal(!showModal)}
			/>
			}
		</Fragment>
	)
}

export default memo(Awards)
