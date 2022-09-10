import {SvgIcon} from "./Icon"

const Header = ({children}) => (
	<header className="mb-4">
		<SvgIcon id="#check-mark-icon" className={`check-mark d-none d-sm-block me-1 me-lg-2`}/>
		<h1>{children}</h1>
	</header>
)

export default Header
