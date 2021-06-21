import React from 'react'

export const getStaticProps = async () => {
	const data = await fetch(process.env.API_SERVER + 'event/5')
	const event = await data.json()

	if (event) {
		return {
			redirect: {
				destination: `/event/${event.id}`,
				permanent: true,
			},
		}
	}

}
