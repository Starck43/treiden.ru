import React from 'react'

import Layout from '~/components/Layout'
import SearchList from '~/components/search/SearchList'


const SearchPage = ({navitems, contacts, extra}) => {
	return (
		<Layout navitems={navitems} contacts={contacts} extra={extra}>
			<SearchList/>
		</Layout>
)}

export default SearchPage


export const getStaticProps = async () => {
	const navitems = await fetch(process.env.API_SERVER + 'navitems')
	const contacts = await fetch(process.env.API_SERVER + 'contacts')
	const extraPosts = await fetch(process.env.API_SERVER + 'posts/extra')

	return {
		props: {
			navitems : await navitems.json(),
			contacts : await contacts.json(),
			extra : await extraPosts.json(),
		},
	}
}
