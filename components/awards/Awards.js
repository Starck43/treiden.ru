import React, { useState, useEffect, useLayoutEffect } from 'react'
import styled from 'styled-components/macro'

import { Items } from '~/components/awards'
import { Section, Header } from '~/components/UI'
import Anchor from '~/components/UI/Anchor'
//import Loading from '~/components/Loading'
//import { Fetch, FetchError } from '~/core/api'
import { getWindowDimensions } from '~/core/helpers/utils'

import { Carousel } from 'react-responsive-carousel'

import style from "~/styles/awards.module.sass"


const getPageCount = () => {
	const [count, setPageCount] = useState(1)

	const handleResize = () => {
		let width = getWindowDimensions().width
		let n = (width < 450) ? 2 : (width < 576) ? 2 : (width < 768) ? 3 : 4
		setPageCount(n)
	}

	useLayoutEffect(() => {
		handleResize()
		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	},[])

	return count
}

const Awards = ({awards}) => {

	const [array, setArray] = useState([])
	const [awardsFormatted, setAwardsFormatted] = useState([])
	const [pageCount, setCount] = useState(1)

	const loadAwards = async () => {
		fetch(process.env.API_SERVER + 'awards')
		.then(response => response.json())
		.then(function(data) {
			setArray(data)
		})
	}
	const count = getPageCount()
	if (pageCount != count) {
		setCount(count)
		if (array.length == 0) loadAwards()
	}

	useEffect(() => {
		setArray(awards)
	},[])

	useEffect(() => {
		setAwardsFormatted(Array(Math.ceil(array.length/pageCount)).fill().map(_ => array.splice(0, pageCount)))
	},[array])


	return ( awardsFormatted.length > 0 &&
	<Section>
		<Anchor id='awards'/>
		<Header>Награды</Header>

		<Slider className='awards-slider' groupKey={'awards'}
			infiniteLoop={false}
			showThumbs={false}
			showStatus={false}
			preventMovementUntilSwipeScrollTolerance={true}
			labels={{leftArrow: 'Назад', rightArrow: 'Вперед', item: 'Слайд'}}
			renderArrowPrev={(onClickHandler, hasPrev, label) =>
				hasPrev && pageCount>3 && <div className='arrow left invert' onClick={onClickHandler} title={label}></div>
			}
			renderArrowNext={(onClickHandler, hasNext, label) =>
				hasNext && pageCount>3 && <div className='arrow right invert' onClick={onClickHandler} title={label}></div>
			}
			renderIndicator={(onClickHandler, isSelected, index, label) =>
				awardsFormatted.length > 1 && <li className={`dot ${isSelected ? 'selected' : ''}`} onClick={onClickHandler} role="button" tabIndex="0" aria-label={label} value={index}></li>
			}
		 >
			{ awardsFormatted.map((row, index) => (
				<div key={`awards-${index}`} className="row">
					<Items awards={row} />
				</div>
			))}
		</Slider>

	</Section>
)}

export default Awards

const Slider = styled(Carousel)``

