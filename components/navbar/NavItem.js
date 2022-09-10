import Link from "next/link"
import {Nav} from "react-bootstrap"

import {smoothScroll} from "../../core/helpers/utils"
import {SvgIcon} from "../UI/Icon"


const NavItem = ({item, pathname, setVisible}) => {
	let href = "/" + (item.link_to !== "page" ? "#" : "") + item.slug

	const handleClick = () => {
		setVisible(false)
		smoothScroll(href, 40)
	}
	const NavItem = () => (
		<>
			<SvgIcon id="#check-mark-icon"/>
			{item.name}
		</>
	)

	return (

		(item.link_to !== "page" && pathname === "/" || item.link_to === "footer") ? (
			<Nav.Link onClick={handleClick}>
				<NavItem/>
			</Nav.Link>
		) : (
			<Link href={href} passHref>
				<Nav.Link>
					<NavItem/>
				</Nav.Link>
			</Link>
		)
	)
}

export default NavItem
