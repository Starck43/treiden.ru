import React from 'react'
import styled from 'styled-components/macro'

import { Logo, Info, Socials } from '~/components/contacts'

const Card = () => (
  <Container>
    <Logo />
    <Content>
      <Info />
      <Socials />
    </Content>
  </Container>
)

export default Card

const Container = styled.div`
  z-index: 50;
  position: relative;
  min-height: 300px;
  padding: 20px 60px 20px 20px;
  background-color: ${props => props.theme.colors.colorLight};
  overflow: hidden;
  white-space: nowrap;
  box-shadow: 2px 3px 3px -2px ${props => props.theme.colors.colorDark};
`
const Content = styled.div`
  display: inline-block;
  padding-left: 20px;
  white-space: normal;
  vertical-align: top;

  @media screen and (max-width: 800px) {
    padding-left: 0;
  }
`
