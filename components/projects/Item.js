import React, { useState } from 'react'
import styled from 'styled-components/macro'
import Image from 'next/image'

import { Icon } from '~/components/UI'

import { Card } from 'react-bootstrap'
import LightBox from 'fslightbox-react'

import style from "~/styles/portfolio.module.sass"


const remoteLoader = ({ src }) => {
  return src
}

const Item = (props) => {
  const [viewerIsOpen, setViewerIsOpen] = useState(false)
  const [currentImage, setCurrentImage] = useState(0)

  const openLightbox = (event) => {
    let el = event.target.parentElement.parentElement
    let index = [...el.parentElement.children].indexOf(el)
    setCurrentImage(index)
    setViewerIsOpen(!viewerIsOpen)
  }

  var images = (props.url) ? [props.url] : []
  var types =  (props.url) ? ['youtube'] : []

  images = images.concat(props.portfolio.length ? props.portfolio.map(obj => (obj.file)) : [props.cover])
  types = types.concat(props.portfolio.length ? props.portfolio.map(obj => ('image')) : ['image'])

  return (
  <Portfolio>
    <Card onClick={openLightbox}>
      <Image
        loader={remoteLoader}
        src={props.cover}
        alt={props.title}
        layout="responsive"
        width={450}
        height={450}
        quality={80}
      />
      <Card.ImgOverlay className={style.overlay}>
        <Card.Title className={style.title}>{props.title}</Card.Title>
        <Card.Text className={style.excerpt}>{props.excerpt}</Card.Text>
      </Card.ImgOverlay>
      { props.url && <Icon name='play' className={`${style.play} centered`} /> }
    </Card>

    <LightBox
      sources={images}
      types={types}
      sourceIndex={currentImage}
      toggler={viewerIsOpen}
    />
  </Portfolio>
)}


export default Item

const Portfolio = styled.div`
  .fslightbox-container{
    .fslightbox-toolbar{
      background: transparent;
    }
    .fslightbox-nav {
      height: 4em;
    }
    .fslightbox-toolbar-button, .fslightbox-slide-btn{
      padding: 0;
      font-size: unset;
      width: 4em;
      height: 4em;
    }

    svg{
      min-width: 1.5em;
      min-height: 1.5em;
      pointer-events: none;
    }

    .fslightbox-toolbar-button:first-child{
      display: none;
    }

  }
`

