import {useState, useRef, useEffect} from "react"
import {useRouter} from "next/router"
import {Form, FormControl, Button} from "react-bootstrap"

import {Icon} from "~/components/UI"


const Search = () => {
	const searchRef = useRef(null)
	const router = useRouter()
	const [text, setText] = useState("")
	const [isHidden, setHidden] = useState(true)

	const inputTextHandler = (e) => {
		setText(e.target.value)
	}

	useEffect(() => {
		const onScroll = () => {
			searchRef?.current[0].blur()
			setHidden(true)
		}

		if (!isHidden) {
			window.addEventListener("scroll", onScroll, false)
			return () => window.removeEventListener("scroll", onScroll, false)
		}

	}, [isHidden])


	const handleSubmit = e => {
		e.preventDefault()
		// input is hidden
		if (isHidden) {
			searchRef.current[0].focus()
		} else {
			searchRef.current[0].blur()
			if (text) {
				router.replace({
					pathname: "/search",
					query: {
						q: encodeURI(text)
					},
				}, undefined, {shallow: false, replace: false})

				setText("")
			}
		}

		setHidden(!isHidden)
	}

	return (
		<div className="nav-search-block ms-2">
			<Form ref={searchRef} className="search-form" onSubmit={handleSubmit}>
				<FormControl
					type="text"
					placeholder="поиск по сайту..."
					className={`ml-2 ${isHidden ? "hidden" : ""}`}
					onChange={inputTextHandler}
				/>
				<Button type="submit" variant="light">
					<Icon name="search"/>
				</Button>
			</Form>
		</div>
	)

}

export default Search
