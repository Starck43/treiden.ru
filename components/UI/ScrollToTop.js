import React, {useState, useEffect} from "react"

import {scrollToRef} from "~/core/helpers/utils"
import {Icon} from "~/components/UI"

//import theme from '~/core/themes/mainTheme'


const ScrollToTop = ({homeRef}) => {
	const [showScroll, setShowScroll] = useState(false)

	const smoothScroll = () => scrollToRef(homeRef)

	useEffect(() => {
		const handleScroll = () => setShowScroll(window.scrollY > window.innerHeight)

		window.addEventListener("scroll", handleScroll)
		return () => window.removeEventListener("scroll", handleScroll)
	}, [])

	return (
		<button className={`scroll-to-top ${showScroll ? "show" : ""}`} onClick={smoothScroll}>
			<Icon name="arrow_top" className="nav-arrow"/>
		</button>
	)
}

export default ScrollToTop
