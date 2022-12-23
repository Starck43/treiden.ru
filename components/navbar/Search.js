import {useState, useRef, useEffect, useCallback, memo} from "react"
import {useRouter} from "next/router"
import {Form, FormControl, Button} from "react-bootstrap"

import {Icon} from "~/components/UI"


export const Search = memo(() => {
	const searchRef = useRef(null)
	const router = useRouter()
	const [text, setText] = useState("")
	const [isHidden, setHidden] = useState(true)

	const inputTextHandler = (e) => {
		setText(e.target.value)
	}

	const onScroll = useCallback(() => {
		searchRef?.current[0].blur()
		setHidden(true)
	},[searchRef]
)

	useEffect(() => {

		if (!isHidden) {
			window.addEventListener("scroll", onScroll, false)
			return () => window.removeEventListener("scroll", onScroll, false)
		}

	}, [isHidden, onScroll])


	const handleSubmit = useCallback((e) => {
		e.preventDefault()
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
	},[searchRef, text, isHidden, router])

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
})

Search.displayName = "Search"
