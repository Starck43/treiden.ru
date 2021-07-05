import React, { Fragment, useState }  from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { createThumbUrl } from '~/core/helpers/utils'

import styled from 'styled-components/macro'
import { Review } from '~/components/customers'

import style from "~/styles/customer.module.sass"
//import styles from 'react-responsive-carousel/lib/styles/carousel.min.css'



const remoteLoader = ({ src, width }) => {
	return createThumbUrl(src, width)
}


const Items = ({ customers }) => {
	const [showModal, setShowModal] = useState(false)
	const [imageIndex, setImageIndex] = useState(0);

	const handleClick = (e) => {
		let el = e.currentTarget
		let index = [...el.parentElement.children].indexOf(el)
		setImageIndex(index)
		setShowModal(!showModal)
	}

	const toggleShow = (e) => {
		setShowModal(!showModal)
	}

	return (
	<Fragment>
		{customers.map(customer => (
		<Customer className={`card col-12 col-sm-6 col-md-4 col-lg-3 ${style.article}`} onClick={handleClick} key={`customer-${customer.id}`}>
			<Avatar className={style.avatar}>
				<Image
					loader={remoteLoader}
					src={customer.avatar}
					alt={customer.title}
					layout="intrinsic"
					width={450}
					height={450}
					quality={80}
				/>
			</Avatar>
			<Header className={`post-title card-title ${style.title}`}>
				{customer.title}
			</Header>
			<Button className={style.button}>
				Посмотреть отзыв
			</Button>
		</Customer>
		))}

		<Review show={showModal} handleClose={toggleShow} customer={customers[imageIndex]} />

	</Fragment>
)}


export default Items


const Customer = styled.figure``
const Avatar = styled.div``
const Header = styled.h3``
const Button = styled.button``


