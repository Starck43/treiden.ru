import ExtraPosts from "../header/ExtraPosts"
import {Slider} from "~/components/UI"

import style from "~/styles/header.module.sass"


const Header = ({posts, sliders}) => {

	const sliderProps = {
		//autoPlay: true,
		interval: 7000,
		infiniteLoop: true,
		showThumbs: true,
	}

	return (
		<section className={`header-section ${style.section}`}>
			<div className={`extra-posts ${style.post}`}>
				<ExtraPosts posts={posts}/>
			</div>
			{/*
			<Title className={(posts.length > 1 ? `${style.titleBottom}` : '')+` ${style.title}`}>
				<div>{header.title}</div>
				<div className={style.subtitle}>{header.subtitle}</div>
			</Title>
			*/}
			<Slider sliders={sliders} className={`header-slider ${style.slider}`} priority groupKey={"activities"} {...sliderProps} />
		</section>
	)
}

export default Header



