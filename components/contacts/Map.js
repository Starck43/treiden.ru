import React from "react"
import styled from "styled-components/macro"
import Image from "next/image"

import {createThumbUrl} from "~/core/helpers/utils"

import style from "~/styles/contacts.module.sass"


const remoteLoader = ({src, width}) => {
	let breakpoints = [320, 640]
	if (breakpoints.indexOf(width) !== -1)
		return createThumbUrl(src, width)
	return src
}

const Map = ({image}) => (
	<Container className={`map ${style.rightBlock} centered`} id="map">
		<Image
			loader={remoteLoader}
			src={image}
			alt={"Геолокация"}
			layout="intrinsic"
			width={320}
			height={180}
			objectFit="cover"
			quality={80}
		/>
	</Container>
)

export default Map


const Container = styled.div``
