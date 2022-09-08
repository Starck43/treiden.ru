import React, {Fragment, useState} from "react"
import Image from "next/image"
import styled from "styled-components/macro"

import {Review} from "~/components/customers"
import {remoteLoader} from "../../core/helpers/utils"

import style from "~/styles/customer.module.sass"


const Items = ({customers}) => {
	const [showModal, setShowModal] = useState(false)
	const [imageIndex, setImageIndex] = useState(0)

	const handleClick = (e) => {
		let el = e.currentTarget
		let index = [...el.parentElement.children].indexOf(el)
		setImageIndex(index)
		setShowModal(!showModal)
	}

	const toggleShow = () => {
		setShowModal(!showModal)
	}

	return (
		<Fragment>
			{customers.map(customer =>
				<figure
					className={`card col-12 col-sm-6 col-md-4 col-lg-3 ${style.article}`}
					onClick={handleClick}
					key={`customer-${customer.id}`}>

					{customer.avatar &&
					<div className={style.avatar}>
						<Image
							loader={remoteLoader}
							src={customer.avatar}
							alt={customer.title}
							layout="intrinsic"
							width={450}
							height={450}
							quality={80}
						/>
					</div>
					}
					<h3 className={`post-title card-title ${style.title}`}>
						{customer.title}
					</h3>
					<button className={style.button}>
						Посмотреть отзыв
					</button>
				</figure>
			)}

			<Review show={showModal} handleClose={toggleShow} customer={customers[imageIndex]}/>

		</Fragment>
	)
}


export default Items


