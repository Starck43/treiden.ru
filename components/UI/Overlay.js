import React from 'react'
import styled from 'styled-components/macro'
import PropTypes from 'prop-types'

const Overlay = ({ id, className, children }) => (
  <Background id={id} className={className}>
    {children}
  </Background>
)

Overlay.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
  id: PropTypes.any
}

export default Overlay

const Background = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: black;
  z-index: 9999;
`
