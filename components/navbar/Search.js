import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components/macro'

import { Form, FormControl, Button } from 'react-bootstrap'
import Icon from '~/components/UI/Icon'
import Loading from '~/components/Loading'
import SearchList from '~/components/search/SearchList'

import { useRouter } from 'next/router'

const Search = () => {
	const searchRef = useRef(null)
	const router = useRouter()
	const [isSearchDisabled, setSearchDisabled] = useState(false)
	const [isScroll, setScroll] = useState(false)

	const inputTextHandler = e => {
		setSearchDisabled((e.target.textLength === 0 ) ? true : false)
	}


	useEffect(() => {
		const onScroll = () => {
			searchRef.current && searchRef.current[0].classList.add('hidden')
			searchRef.current[0].blur()
			setScroll(false)
		}

		if (isScroll) {
			window.addEventListener('scroll', onScroll, false)
			return () => window.removeEventListener('scroll', onScroll, false)
		}

	},[isScroll]);


	const handleSubmit = e => {
		e.preventDefault()
		e.stopPropagation()
		let text = e.target.querySelector('[type=text]')
		if (text.classList.contains('hidden')) {
			text.classList.remove('hidden')
			text.focus()
			setScroll(true)
		}
		else
		{
			if (text.value == '') {
				text.classList.add('hidden')
				text.blur()
				setScroll(false)
			}
			else
			{
				const searchQuery = text.value
				router.replace({
					pathname: "/search/",
					query: {
						q: encodeURI(searchQuery)
					},
				}, undefined, {shallow: true})
				text.value = ''
			}
		}
	}

	return (
	<Container className="nav-search-block ms-2">
		<Form className="search-form" inline onSubmit={handleSubmit} ref={searchRef}>
			<FormControl type="text" placeholder="Поиск по сайту..." className="hidden ml-2" onChange={inputTextHandler} />
			<Button type="submit" variant="light" disabled={isSearchDisabled}><Icon name="search" /></Button>
		</Form>
	</Container>
	)

}

export default Search

const Container = styled.div``

