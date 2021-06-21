import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
//import Slide from 'react-reveal/Slide'

const SlideIterator = ({ children }) => {
  return (
    <Fragment>
      {children.map((element, index) => (
        <div key={index}>
          {element}
        </div>
      ))}
    </Fragment>
  )
}

SlideIterator.propTypes = {
  children: PropTypes.array
}
export default SlideIterator
