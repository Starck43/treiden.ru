import React, { useRef, useState, useEffect } from 'react'
import styled from 'styled-components/macro'
import Link from 'next/link'

import { scrollToRef } from '~/core/helpers/utils'
import { Icon } from '~/components/UI'

//import theme from '~/core/themes/mainTheme'

const ScrollToTop = ({homeRef}) => {
  const scrollBtnRef = useRef(false)
  let showScroll = false

  const smoothScroll = () => scrollToRef(homeRef)

  const handleScroll = () => {
    if (scrollBtnRef.current) {
      if (!showScroll && window.scrollY > window.innerHeight) {
        showScroll = true
        scrollBtnRef.current.classList.add('show')
      }
      else
      if (showScroll && window.scrollY <= window.innerHeight) {
        scrollBtnRef.current.classList.remove('show')
        showScroll = false
      }
    }

  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
  },[])

  return(
  <button className='scroll-to-top' onClick={smoothScroll} ref={scrollBtnRef}>
      <Icon name='arrow_top' className='nav-arrow' />
  </button>
)}

export default ScrollToTop


const Button = styled.button``