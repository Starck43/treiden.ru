import React from 'react'
import styled from 'styled-components/macro'

import { Item } from '~/components/projects'
import { Row, Col } from 'react-bootstrap'
//import s from './LightBox.sass'

import style from "~/styles/portfolio.module.sass"


const List = ({ projects, title }) => {

	return (
	<Row className={style.row}>
		{ title && <h2 className={style.h2}>{title}</h2>}
		{projects.map((project) => (
		<Col className={style.column} xs='12' sm='6' lg='4' key={project.id}>
			<Item
				title={project.title}
				excerpt={project.excerpt}
				description={project.description}
				cover={project.cover}
				url={project.url}
				portfolio={project.portfolio}
			/>
		</Col>
		))}
	</Row>
)}

// ToDo: add pointer-events: none; for LightBox svg arrows CSS
// ToDo: Hide fullscreen mode for LightBox via CSS


export default List


