import React from 'react'
import Layout from '/core/error/Layout'

const NotFound = () => (
	<Layout
		title={'Ошибка сервера: 404'}
		description={'Данная страница не существует или сменила название.'}
	/>
)

export default NotFound
