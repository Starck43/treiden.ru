import React from 'react'
import Error from '/core/error/Error'

const ErrorPage = ({ statusCode }) => <Error statusCode={statusCode} />

ErrorPage.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default ErrorPage
