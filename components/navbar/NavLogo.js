import Link from "next/link"
import {Navbar} from "react-bootstrap"
import {memo} from "react"
import Image from "next/image"

import Logo from "/public/images/logo.png"

export const NavLogo = memo(({href, pathname}) => {
	let url = pathname === "/" ? "#" : href
	let navBrand =
		<Navbar.Brand href={url}>
			<Image alt="logo" src={Logo} />
		</Navbar.Brand>

	return (
		pathname !== "/"
			? <Link href={url} legacyBehavior>{navBrand}</Link>
			: <>{navBrand}</>
	)
})

NavLogo.displayName = "NavLogo"
