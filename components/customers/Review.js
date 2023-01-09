import {useEffect, useState} from "react"
import {Modal, Row, Col} from "react-bootstrap"

import {Cover, VideoPlayer, HtmlContent} from "/components/UI"

import style from "./Review.module.sass"


const Review = ({customer, show, handleClose}) => {
	const [videoState, setVideoState] = useState(null)
	const [isLoaded, setLoaded] = useState(false)

/*	const videoClickHandle = (e) => {
		let currentState = videoState[customer.id]
		currentState.playing = !videoState.playing
		setVideoState({
			...videoState,
			[customer.id]: currentState
		})
	}*/

	useEffect(() => {
		setVideoState({
			[customer.id]: {
				id: customer.id,
				url: customer.url,
				ended: false,
				loaded: 0,
				played: 0,
				playing: false
			}
		})
	}, [customer])


	return (
		<Modal show={show} onHide={handleClose} size="xl" fullscreen="sm-down" scrollable={true} centered>
			<Modal.Header className={style.container}>
				<h3 className="mb-0">Отзыв клиента</h3>
				<button type="button" className="btn-close btn-lg" onClick={handleClose} data-bs-dismiss="modal"
				        aria-label="Закрыть"/>
			</Modal.Header>

			<Modal.Body className={style.container}>
				{customer?.title &&
				<div className={style.title}>
					<h3>{customer?.title}</h3>
					{customer?.subtitle && <span className={style.subtitle}>{customer.subtitle}</span>}
				</div>
				}

				<Row>
					<Col sm={12} md={12} lg={5}>
						<div className={style.avatar}>
							{customer.avatar &&
							<Cover
								src={customer.avatar}
								alt={customer?.title}
								sizes={[320, 450]}
								layout="intrinsic"
								width={450}
								height={450}
								imageLoading={setLoaded}
							/>
							}
							{isLoaded && videoState && customer.url && (
								<VideoPlayer
									id={customer.id}
									playerState={videoState}
									setPlayerState={setVideoState}
								/>
							)}
						</div>
					</Col>

					<Col sm md lg={7}>
						<HtmlContent className={style.content}>{customer.review}</HtmlContent>
					</Col>
				</Row>
			</Modal.Body>

		</Modal>
	)
}

export default Review
