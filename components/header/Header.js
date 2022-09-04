import React from "react"
import styled from "styled-components/macro"

import ExtraPosts from "../header/ExtraPosts"
import {Slider} from "~/components/UI"

import style from "~/styles/header.module.sass"


const Header = ({posts, sliders}) => {

	const sliderProps = {
		autoPlay: true,
		interval: 7000,
		infiniteLoop: true,
		showThumbs: true,
	}

	return (
		<HeaderSection className={`header-section ${style.section}`}>
			<Posts className={`extra-posts ${style.post}`}>
				<ExtraPosts posts={posts}/>
			</Posts>
			{/*
			<Title className={(posts.length > 1 ? `${style.titleBottom}` : '')+` ${style.title}`}>
				<div>{header.title}</div>
				<div className={style.subtitle}>{header.subtitle}</div>
			</Title>
			*/}
			<Slider sliders={sliders} className={style.slider} groupKey={"activities"} {...sliderProps} />
		</HeaderSection>
	)
}

export default Header

const HeaderSection = styled.section``
const Posts = styled.div``



