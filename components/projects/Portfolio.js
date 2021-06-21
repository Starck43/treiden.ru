import React from 'react'
import styled from 'styled-components/macro'
import PropTypes from 'prop-types'

import { Section, Header } from '~/components/UI'
import { List, Filter } from '~/components/projects'

import Anchor from '~/components/UI/Anchor'


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