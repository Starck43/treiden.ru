import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import Header from '/core/error/layout/Header'
import Title from '/core/error/layout/Title'
import Description from '/core/error/layout/Description'
import { Button } from 'react-bootstrap'

const Layout = ({ title, description }) => (
	<Fragment>
		<Header>Oops!</Header>
		<Title>{title}</Title>
		<Description>{description}</Description>
		<Link href="/">
			<Button variant="warning">На главную</Button>
		</Link>
	</Fragment>
)


Layout.propTypes = {
	title: PropTypes.string,
	description: PropTypes.string
}

export default Layout
