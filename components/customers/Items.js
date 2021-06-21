import React, { Fragment, useState }  from 'react'
import Image from 'next/image'
import Link from 'next/link'

import styled from 'styled-components/macro'
import { Review } from '~/components/customers'

import style from "~/styles/customer.module.sass"
//import styles from 'react-responsive-carousel/lib/styles/carousel.min.css'

const remoteLoader = ({ src }) => {
  return src
}

const Items = ({ customers }) => {
  const [showModal, setShowModal] = useState(false)
  const toggleShow = () => setShowModal(!showModal);

  return (
  customers.map(customer => (
    <Fragment key={customer.id}>
      <Customer className={`card col-6 col-md-3 ${style.article}`} onClick={toggleShow}>
        <Avatar className={style.avatar}>
          <Image
            loader={remoteLoader}
            src={customer.avatar}
            alt={customer.title}
            layout="responsive"
            objectFit="contain"
            width={320}
            height={320}
            quality={80}
          />
        </Avatar>
        <Body className={style.body}>
          <h2 className={`post-title card-title ${style.title}`}>
            {customer.title}
          </h2>
          <Button className={style.button}>
            Посмотреть отзыв
          </Button>
        </Body>
      </Customer>

      <Review show={showModal} handleClose={toggleShow} customer={customer} />

    </Fragment>
  ))
)}


export default Items


const Customer = styled.figure``
const Avatar = styled.div``
const Body = styled.div``
const Button = styled.button``


