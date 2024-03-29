import React, {memo} from "react"
import {Row, Col} from "react-bootstrap"

import {Item} from "./Item"

import style from "./Projects.module.sass"


export const List = memo(({projects, title}) => (
	<Row className={style.row}>
		{title && <h2 className={style.h2}>{title}</h2>}
		{projects.map(project => (
			<Col className={style.column} xs="12" sm="6" lg="4" key={project.id}>
				<Item project={project}/>
			</Col>
		))}
	</Row>
))

List.displayName = "List"
