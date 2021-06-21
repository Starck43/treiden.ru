import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import { General, NotFound, InternalServer } from '~/core/error'


const Error = ({ statusCode }) => {
  return (
    <Container>
      <Content>{renderError(statusCode)}</Content>
    </Container>
  )
}

const renderError = statusCode => {
  switch (statusCode) {
    case 404:
      return <NotFound />
    case 500:
      return <InternalServer />
    default:
    case undefined:
      return <General />
  }
}

Error.propTypes = {
  statusCode: PropTypes.number
}

export default Error

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 50%;
  text-align: center;
  transform: translateY(-50%);
  background-color: ${props => props.theme.colors.colorLight};
`
const Content = styled.div`
  position: relative;
  float: left;
  top: 50%;
  left: 50%;
  max-width: 800px;
  transform: translate(-50%, -50%);
`
