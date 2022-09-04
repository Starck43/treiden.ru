import React from "react"
import Link from "next/link"

import {Nav} from "react-bootstrap"

const NavItem = ({item, pathname, close}) => {
	let href = "/" + (item.link_to !== "page" ? "#" : "") + item.slug
	return (
		(item.link_to === "index_page") && pathname === "/" ? (
			<Nav.Link href={href} onClick={close}>
				{item.name}
			</Nav.Link>
		) : (
			<Link href={href} passHref>
				<Nav.Link onClick={close}>
					{item.name}
				</Nav.Link>
			</Link>
		)
	)
}

export default NavItem
