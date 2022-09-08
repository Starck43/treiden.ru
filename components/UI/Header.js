const Header = ({children}) => (
	<header className="mb-4">
		<svg viewBox="0 0 46 20" className="check-mark svg-icon d-none d-sm-block me-1 me-lg-2">
			<use xlinkHref="#check-mark-icon"/>
		</svg>
		<h1>
			{children}
		</h1>
	</header>
)

export default Header
