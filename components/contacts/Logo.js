import React from 'react'
import styled from 'styled-components/macro'

const Logo = () => <Container>iStarck</Container>

const Container = styled.div`
  display: inline-block;
  color: ${props => props.theme.colors.colorAccent};
  font-size: 5vw;
  line-height: 1;
  letter-spacing: -4px;
  font-family: ${props => props.theme.fonts.fontSans};
  font-weight: bold;
  border: none;
  vertical-align: top;

  @media screen and (max-width: 768px) {
    display: block;
  }
`

export default Logo
