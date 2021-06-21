import React from 'react'
import PropTypes from 'prop-types'
import _JSXStyle from "styled-jsx/style"

const GlobalStyles = ({ theme }) => {
  return (
    <style jsx global>{`
      html,
      body {
        color: ${theme.colors.colorDark};
        line-height: 1.25;
        scroll-behavior: smooth;
      }
      body:after {
        content: '';
        position: fixed;
        top: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        opacity: ${theme.images.bgPatternOpacity};
        z-index: -1;
        background: ${theme.colors.bgColor};
        background-size: ${theme.images.bgSize};
      }
      *:selection {
        color: ${theme.colors.colorLight};
        background-color: ${theme.colors.colorDarken};
      }
      *::-moz-selection {
        color: ${theme.colors.colorLight};
        background-color: ${theme.colors.colorDarken};
      }

    `}</style>
  )
}

GlobalStyles.propTypes = {
  theme: PropTypes.any
}

export default GlobalStyles
