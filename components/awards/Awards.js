import React from 'react'
import styled from 'styled-components/macro'

import Loading from '~/components/Loading'
import { Fetch, FetchError } from '~/core/api'
import { Items } from '~/components/awards'
import { Section, Header } from '~/components/UI'
import Anchor from '~/components/UI/Anchor'

import { Carousel } from 'react-responsive-carousel'

import style from "~/styles/awards.module.sass"


const Awards = () => {
	var {data, error} = Fetch('awards')
	if (error) return <FetchError error={error} />
	if (!data) return <Loading/>
	const n = 2
	if (data) data = Array(Math.ceil(data.length / n)).fill().map(_ => data.splice(0, n))

	return (
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
				hasPrev && <div className={`arrow invert ${style.arrow} ${style.arrowLeft}`} onClick={onClickHandler} title={label}></div>
			}
			renderArrowNext={(onClickHandler, hasNext, label) =>
				hasNext && <div className={`arrow invert right ${style.arrow} ${style.arrowRight}`} onClick={onClickHandler} title={label}></div>
			}
			renderIndicator={(onClickHandler, isSelected, index, label) =>
				data.length > 1 && <li className={`dot ${isSelected ? 'selected' : ''}`} onClick={onClickHandler} role="button" tabIndex="0" aria-label={label} value={index}></li>
			}
		 >
			{ data && data.map((row, index) => (
				<div key={`awards-${index}`} className="row">
					<Items awards={row} />
				</div>
			))}
		</Slider>

	</Section>
)}

export default Awards

const Slider = styled(Carousel)``

