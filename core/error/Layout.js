import React, { Fragment } from 'react'
import Link from 'next/link'
import { Button } from 'react-bootstrap'

import Header from '/core/error/layout/Header'
import Title from '/core/error/layout/Title'
import Description from '/core/error/layout/Description'

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

export default Layout
