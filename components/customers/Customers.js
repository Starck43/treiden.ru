import React, {useState, useEffect, useLayoutEffect} from 'react'
import styled from 'styled-components/macro'

import { Items } from '~/components/customers'
import { Section, Header } from '~/components/UI'
import Anchor from '~/components/UI/Anchor'
import { getWindowDimensions } from '~/core/helpers/utils'
//import { Fetch, FetchError } from '~/core/api'

import { Carousel } from 'react-responsive-carousel'

import style from "~/styles/customer.module.sass"


const getPageCount = () => {
	const [count, setPageCount] = useState(1)

	const handleResize = () => {
		let width = getWindowDimensions().width
		let n = (width < 576) ? 1 : (width < 768) ? 2 : (width < 992) ? 3 : 4
		setPageCount(n)
	}

	useLayoutEffect(() => {
		handleResize()
		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	},[])

	return count
}


const Customers = ({customers}) => {
	const [array, setArray] = useState([])
	const [customersFormatted, setCustomersFormatted] = useState([])
	const [pageCount, setCount] = useState(1)

	const count = getPageCount()
	if (pageCount != count) {
		setCount(count)
		//console.log(pageCount, count);
	}

	useEffect(() => {
		setArray(customers)
	},[])

	useEffect(() => {
		//console.log(array);
		setCustomersFormatted(Array(Math.ceil(array.length/pageCount)).fill().map(_ => array.splice(0, pageCount)))
	},[pageCount])

	return (customersFormatted.length > 0 &&
	<Section className={style.section}>
		<Anchor id='customers'/>
		<Header>
			Наши клиенты
		</Header>

		<Slider className={`customers-slider`} groupKey={'customers'}
			infiniteLoop={false}
			showThumbs={false}
			showIndicators={true}
			showStatus={false}
			preventMovementUntilSwipeScrollTolerance={true}
			labels={{leftArrow: 'Назад', rightArrow: 'Вперед', item: 'Клиент'}}
			renderArrowPrev={(onClickHandler, hasPrev, label) =>
				hasPrev && <div className='arrow left invert' onClick={onClickHandler} title={label}></div>
			}
			renderArrowNext={(onClickHandler, hasNext, label) =>
				hasNext && <div className='arrow right invert' onClick={onClickHandler} title={label}></div>
			}
			renderIndicator={(onClickHandler, isSelected, index, label) =>
				customersFormatted.length > 1 && <li className={`dot ${isSelected ? 'selected' : ''}`} onClick={onClickHandler} role="button" tabIndex="0" aria-label={label} value={index}></li>
			}
		 >
			{customersFormatted.map((row, index) => (
				<div key={`row-${index}`} className="row">
					<Items customers={row} />
				</div>
			))}
		</Slider>
	</Section>
)}

export default Customers

const Slider = styled(Carousel)``
