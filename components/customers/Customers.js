import React, {useState, useEffect} from 'react'
import styled from 'styled-components/macro'

import { Items } from '~/components/customers'
import { Section, Header } from '~/components/UI'
import Anchor from '~/components/UI/Anchor'

import { Carousel } from 'react-responsive-carousel'

import style from "~/styles/customer.module.sass"


const Customers = ({customers}) => {
	const [data, setCustomers] = useState([])
	var n = 2

	useEffect(() => {
		setCustomers(Array(Math.ceil(customers.length / n)).fill().map(_ => customers.splice(0, n)))
	},[]);

	return (
	<Section className={style.section}>
		<Anchor id='customers'/>
		<Header>
			Наши клиенты
		</Header>

		<Slider className={style.container}
			infiniteLoop={false}
			showThumbs={false}
			showStatus={false}
			preventMovementUntilSwipeScrollTolerance={true}
			labels={{leftArrow: 'Назад', rightArrow: 'Вперед', item: 'Клиент'}}
			renderArrowPrev={(onClickHandler, hasPrev, label) =>
				hasPrev && <div className={`${style.arrow} ${style.arrowLeft}`} onClick={onClickHandler} title={label}></div>
			}
			renderArrowNext={(onClickHandler, hasNext, label) =>
				hasNext && <div className={`${style.arrow} ${style.arrowRight}`} onClick={onClickHandler} title={label}></div>
			}
			renderIndicator={(onClickHandler, isSelected, index, label) =>
				data.length > 1 && <li className={`dot ${isSelected ? 'selected' : ''}`} onClick={onClickHandler} role="button" tabIndex="0" aria-label={label} value={index}></li>
			}
		 >
			{data.map((row, i) => (
				<div key={i} className="row">
					<Items customers={row} />
				</div>
			))}
		</Slider>
	</Section>
)}

export default Customers

const Slider = styled(Carousel)`
	@media screen and (min-width: 768px) {
		margin: 1em -4em 0;
		.carousel-slider{
			.slide{
				padding: 0 4em;
			}
		}
	}
	.control-dots{
		margin-bottom: 0em;
		padding: 0;
	}
`
