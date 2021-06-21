import React from 'react'
import styled from 'styled-components/macro'

//import ScaleLoader from 'react-spinners/ScaleLoader'
//import theme from '~/core/themes/mainTheme'

const Loading = () => (
  <Container/>
)

/*  <div className="progress-theme">
    <div className="inner">
      <div className="loader">
        <ScaleLoader
          sizeUnit={'px'}
          height={20}
          width={5}
          color={theme.colors.colorAccent}
          loading
        />
      </div>
    </div>
  </div>
  */

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