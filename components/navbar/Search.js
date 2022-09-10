import {useState, useEffect, useRef} from "react"
import {useRouter} from "next/router"
import {Form, FormControl, Button} from "react-bootstrap"

import {Icon} from "~/components/UI"


const Search = () => {
	const searchRef = useRef(null)
	const router = useRouter()
	const [isSearchDisabled, setSearchDisabled] = useState(false)
	const [isScroll, setScroll] = useState(false)

	const inputTextHandler = e => setSearchDisabled(e.target.textLength === 0)


	useEffect(() => {
		const onScroll = () => {
			searchRef?.current[0].classList.add("hidden")
			searchRef?.current[0].blur()
			setScroll(false)
		}

		if (isScroll) {
			window.addEventListener("scroll", onScroll, false)
			return () => window.removeEventListener("scroll", onScroll, false)
		}

	}, [isScroll])


	const handleSubmit = e => {
		e.preventDefault()
		e.stopPropagation()
		let text = searchRef.current[0]
		if (text.classList.contains("hidden")) {
			text.classList.remove("hidden")
			text.focus()
			setScroll(true)
		} else {
			if (!text.value) {
				text.classList.add("hidden")
				text.blur()
				setScroll(false)
				setSearchDisabled(!isSearchDisabled)
			} else {
				const searchQuery = searchRef.current[0].value
				setSearchDisabled(false)
				router.replace({
					pathname: "/search",
					query: {
						q: encodeURI(searchQuery)
					},
				}, undefined, {shallow: false, replace: false})
			}
		}
	}

	return (
		<div className="nav-search-block ms-2">
			<Form ref={searchRef} className="search-form" onSubmit={handleSubmit}>
				<FormControl
					type="text"
					placeholder="поиск по сайту..."
					className="hidden ml-2"
					onChange={inputTextHandler}
				/>
				<Button type="submit" variant="light" disabled={isSearchDisabled}>
					<Icon name="search"/>
				</Button>
			</Form>
		</div>
	)

}

export default Search


