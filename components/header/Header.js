import {memo} from "react"
import {SwiperSlide} from "swiper/react"

import ExtraPosts from "/components/posts/ExtraPosts"
import {Slider, Cover} from "/components/UI"

import style from "./Header.module.sass"


const Header = ({slides, extra}) => {

	return (
		<section className={`header-section ${style.section}`}>
			<div className={`extra-posts ${style.post}`}>
				<ExtraPosts posts={extra} sections={["H", "HF"]} />
			</div>

			<Slider
				slides={slides}
				effect="fade"
				duration={1200}
				interval={7000}
				infinite={slides.length > 1}
				className={`header-slider ${style.slider}`}
				navigationController
			>
				{slides.map((obj, i) => (
					<SwiperSlide key={i} className={style.slide}>
						{(obj?.cover || obj?.file) &&
						<Cover
							src={obj.cover || obj.file}
							alt={obj?.title}
							sizes={[320, 450, 640, 768, 1080, 1200]}
							width={320}
							height={180}
							priority
						/>
						}

						{obj?.showTitle &&
						<p className={style.title}>
							{obj.title}
						</p>
						}
					</SwiperSlide>
				))}

			</Slider>
		</section>
	)
}

export default memo(Header)
