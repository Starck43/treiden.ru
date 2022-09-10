import {useState, useEffect} from "react"

import {Icon} from "~/components/UI"
import {smoothScroll} from "../../core/helpers/utils"

//import theme from '~/core/themes/mainTheme'


const ScrollToTop = ({homeRef}) => {
	const [showScroll, setShowScroll] = useState(false)

	const handleScrollUp = () => smoothScroll(homeRef?.current,0)

	useEffect(() => {
		const handleScroll = () => setShowScroll(window.scrollY > window.innerHeight * 1.5)

		window.addEventListener("scroll", handleScroll)
		return () => window.removeEventListener("scroll", handleScroll)
	}, [])

	return (
		<button className={`scroll-to-top ${showScroll ? "show" : ""}`} onClick={handleScrollUp}>
			<Icon name="arrow_top" className="nav-arrow"/>
		</button>
	)
}

export default ScrollToTop
