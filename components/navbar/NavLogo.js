import React from 'react'
import Link from 'next/link'
import styled from 'styled-components/macro'

import { Navbar } from 'react-bootstrap'
import PropTypes from 'prop-types'

const NavLogo = ({ href, logo, pathname }) => {
  let url = pathname == '/' ? '#' : href
  var navBrand =
    <Navbar.Brand href={url}>
      <img alt="logo" src={logo} />
    </Navbar.Brand>

  return (
    pathname !== '/'
      ? <Link href={url}>{navBrand}</Link>
      : <>{navBrand}</>
  )}


NavLogo.propTypes = {
  href: PropTypes.string,
  logo: PropTypes.string,
  pathname: PropTypes.string,
}

export default NavLogo

