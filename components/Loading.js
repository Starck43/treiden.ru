import React from 'react'
import styled from 'styled-components/macro'


const Loading = () => (
  <Container/>
)


export default Loading

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  transition: all 100ms ease;
  background-color: rgba(255,255,255, .5);
  z-index: 9999;
`