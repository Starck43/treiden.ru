import React from 'react'
import Layout from '/core/error/Layout'

const General = () => (
		<Layout
			title={'Что-то пошло не так!'}
			description={
				'Возникла непредвиденная ошибка на стороне клиента.\
				 Стоит попробовать обновить страницу или вернуться в начало.'
			}
		/>
 )

export default General
