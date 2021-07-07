import React from 'react'
//import { useRouter } from 'next/router'
import { ThemeProvider } from 'styled-components/macro'

import theme from '~/core/themes/mainTheme'


const ThemeContainer = ({ children }) => {
  //const router = useRouter()
  //const theme = selectTheme(router)
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  )
}

export default ThemeContainer


/*export const selectTheme = router => {
  return theme
}*/
