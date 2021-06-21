import React from 'react'
import styled from 'styled-components/macro'
import Image from 'next/image'
import getConfig from 'next/config'

import { Item } from '~/components/services'
import Anchor from '~/components/UI/Anchor'

import style from "~/styles/activity.module.sass"


const { publicRuntimeConfig } = getConfig() //next.config.js

const Activities = ({activities}) => (
	<Section className={style.section}>
		<Anchor id='activities' />
		<Image
			src={publicRuntimeConfig.bgImage}
			layout="fill"
			objectFit="cover"
			quality={80}
			alt="Виды деятельности"
		/>
		<Container className={style.activities}>
			{activities.map((activity) => (
				<Item key={activity.slug} activity={activity} />
			))}
		</Container>
	</Section>
)

export default Activities


const Container = styled.div``

const Section = styled.section``


