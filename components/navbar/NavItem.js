import React from "react"
import Link from "next/link"

import {Nav} from "react-bootstrap"

const NavItem = ({item, pathname}) => {
	let href = "/" + (item.link_to !== "page" ? "#" : "") + item.slug
	return (
		(item.link_to === "index_page") && pathname === "/" ? (
			<Link href={href} passHref scroll={false}>
				<Nav.Link>
					{item.name}
				</Nav.Link>
			</Link>
		) : (
			<Link href={href} passHref>
				<Nav.Link>
					{item.name}
				</Nav.Link>
			</Link>
		)
	)
}

export default NavItem
