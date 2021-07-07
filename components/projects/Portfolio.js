import React from 'react'
import styled from 'styled-components/macro'
import PropTypes from 'prop-types'

import { Section, Header, Anchor } from '~/components/UI'
import { List, Filter } from '~/components/projects'


const Portfolio = ({categories, projects}) => {

	return (
	<Section>
		<Header>Портфолио</Header>
		<Filter categories={categories} />
		<List projects={projects} />
	</Section>
)}

export default Portfolio


Portfolio.propTypes = {
	projects: PropTypes.array,
	categories: PropTypes.array,
}