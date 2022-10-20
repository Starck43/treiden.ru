import {Fragment, useState} from "react"

import Review from "./Review"
import {Cover} from "../UI"

import style from "~/styles/customer.module.sass"


const Item = ({customer}) => {
	const [showModal, setShowModal] = useState(false)

	const toggleShow = () => {
		setShowModal(!showModal)
	}

	return (
		<Fragment>
			{customer?.avatar &&
			<figure className={style.avatar} onClick={toggleShow}>
				<Cover
					src={customer.avatar}
					alt={customer?.title}
					sizes={[320, 450]}
					layout="intrinsic"
					width={450}
					height={450}
				/>
				<h3 className={`post-title card-title ${style.title}`}>
					{customer.title}
				</h3>
				<button className={style.button}>
					Посмотреть отзыв
				</button>
			</figure>
			}
			{showModal &&
			<Review customer={customer} show={showModal} handleClose={toggleShow}/>
			}
		</Fragment>
	)
}

export default Item
