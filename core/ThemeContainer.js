import React from 'react'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import { ThemeProvider } from 'styled-components/macro'

import theme from '~/core/themes/mainTheme'
import { GlobalStyles } from '~/core'


const ThemeContainer = ({ children }) => {
  const router = useRouter()
  const theme = selectTheme(router)
  return (
    <ThemeProvider theme={theme}>
      {children}
      <GlobalStyles theme={theme} />
    </ThemeProvider>
  )
}

ThemeContainer.propTypes = {
  children: PropTypes.any
}

export default ThemeContainer


export const selectTheme = router => {
/*  if (/blogs/.test(router.pathname)) {
    return blogTheme
  }*/
  return theme
}
