import Link from "next/link"
import {Navbar} from "react-bootstrap"
import {memo} from "react"


export const NavLogo = memo(({href, logo, pathname}) => {
	let url = pathname === "/" ? "#" : href
	let navBrand =
		<Navbar.Brand href={url}>
			<img alt="logo" src={logo}/>
		</Navbar.Brand>

	return (
		pathname !== "/"
			? <Link href={url}>{navBrand}</Link>
			: <>{navBrand}</>
	)
})

NavLogo.displayName = "NavLogo"
