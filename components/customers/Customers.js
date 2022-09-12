import {SwiperSlide} from "swiper/react"

import Item from "./Item"
import {Slider, Anchor, Section, Header} from "../UI"

import style from "~/styles/customer.module.sass"

const SECTION = "customers"
const SECTION_TITLE = "Наши клиенты"


const Customers = ({customers}) => {
	return (
		customers.length > 0 &&
		<Section className={style.section}>
			<Anchor id={SECTION}/>
			<Header>
				{SECTION_TITLE}
			</Header>

			<Slider
				slides={customers}
				duration={300}
				freeScroll
				responsive={{
					450: {
						slidesPerView: 2,
					},
					675: {
						slidesPerView: 3,
					},
					900: {
						slidesPerView: 4,
					},
					1125: {
						slidesPerView: 5,
					}
				}}
				className="customers-slider with-outside-controls"
			>
				{customers.map(customer =>
					<SwiperSlide className={`${style.article}`} key={`customer-${customer.id}`}>
						<Item customer={customer}/>
					</SwiperSlide>
				)}
			</Slider>

		</Section>
	)
}

export default Customers
