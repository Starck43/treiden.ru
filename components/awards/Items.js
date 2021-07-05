import React, { Fragment, useState }  from 'react'
import Image from 'next/image'
import styled from 'styled-components/macro'

import { createThumbUrl } from '~/core/helpers/utils'
import { Modal } from 'react-bootstrap'

import style from "~/styles/awards.module.sass"



const remoteLoader = ({ src, width }) => {
	let breakpoints = [320, 450, 640]
	if (breakpoints.indexOf(width) !== -1)
		return createThumbUrl(src, width)
	return src
}


const Items = ({ awards, onClick }) => {

	const [imageIndex, setImageIndex] = useState(0)
	const [show, setShow] = useState(false)

	const handleClose = () => setShow(false)

	const handleClick = (e) => {
		let el = e.currentTarget
		let index = [...el.parentElement.children].indexOf(el)
		setImageIndex(index)
		setShow(true)
	}

	return (
	<Fragment>
		{awards.map(award => (
		<Award id={award.id} key={award.year} className={`col-6 col-sm-4 col-md-3 ${style.figure}`} onClick={handleClick}>
			<Image className={style.cover}
				loader={remoteLoader}
				src={award.file}
				alt={award.title}
				layout="intrinsic"
				width={320}
				height={450}
				quality={80}
			/>
		 {/* <Title className={style.title}>{award.title}</Title>*/}
		</Award>
		))}
		<LightBox show={show} onHide={handleClose} item={awards[imageIndex]}/>
	</Fragment>
)}

const LightBox = (props) => {
	return (
		<Modal
			className='lightbox-container'
			show={props.show}
			onHide={props.onHide}
			animation={false}
			fullscreen={true}
			scrollable={false}
		>
			<CloseBtn type="button" className="btn-close btn-lg btn-close-white" aria-label="Закрыть" onClick={props.onHide}/>
			<Modal.Header className={style.header}>
				<Modal.Title>{props.item.title}</Modal.Title>
				<Description>{props.item.description}</Description>
			</Modal.Header>
			<Modal.Body>
				<Image className={style.cover}
					loader={remoteLoader}
					src={props.item.file}
					alt={props.item.title}
					layout="responsive"
					width={320}
					height={450}
					objectFit="contain"
					quality={80}
				/>
			</Modal.Body>
		</Modal>
)}

export default Items

const Award = styled.figure``
const Title = styled.h3``
const Description = styled.div``
const CloseBtn = styled.div``

