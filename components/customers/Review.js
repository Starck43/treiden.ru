import React, { Fragment, useEffect, useState }  from 'react'
import styled from 'styled-components/macro'
import Image from 'next/image'
import Link from 'next/link'

import { getYouTubeID, createThumbUrl } from '~/core/helpers/utils'

import { Modal, Button, Row, Col } from 'react-bootstrap'
import LiteYouTubeEmbed from "react-lite-youtube-embed"

import style from "~/styles/review.module.sass"




const remoteLoader = ({ src, width }) => {
	return createThumbUrl(src, width)
}


const Review = ({show, handleClose, customer}) => {
	const [fullMode, setVideoMode] = useState(false)

	const videoClickHandle = (e) => {
		e.currentTarget.style.position = 'static'
		//e.currentTarget.parentElement.style.width = '100%'
		setVideoMode(true)
	}

	return (
	<Modal show={show} onHide={handleClose} size="xl" fullscreen="sm-down" scrollable={true} centered>
		<Modal.Header className={style.container}>
			<h3 className='mb-0'>Отзыв клиента</h3>
			<button type="button" className="btn-close btn-lg" onClick={handleClose} data-bs-dismiss="modal" aria-label="Закрыть"></button>
		</Modal.Header>

		<Modal.Body className={style.container}>
			<Row>
				<Title className={style.title}>
					<h3>{customer.title}</h3>
					<span className={style.subtitle}>{customer.subtitle}</span>
				</Title>
				<Col sm={12} md={12} lg={4} xl={5}>
					<Cover className={style.avatar} onClick={videoClickHandle}>
						<Image
							loader={remoteLoader}
							src={customer.avatar}
							alt={customer.title}
							layout="intrinsic"
							objectFit="cover"
							width={450}
							height={450}
							quality={80}
						/>
						{ customer.url && (
							<YouTube
								id={getYouTubeID(customer.url)}
								title={customer.title}
								wrapperClass="youtube-lite"
								playerClass="play-btn"
								adNetwork={false}
							/>
						)}
					</Cover>
				</Col>
				<Col sm md lg={8} xl={7}>
					<Content className={style.content} dangerouslySetInnerHTML={{ __html: customer.review }} />
				</Col>
			</Row>
		</Modal.Body>

	</Modal>
)}

export default Review


const Title = styled.div``
const Content = styled.div``
const Cover = styled.div``
const YouTube = styled(LiteYouTubeEmbed)``



