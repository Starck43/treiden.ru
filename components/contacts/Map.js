import React from 'react'
import styled from 'styled-components/macro'

import style from "~/styles/contacts.module.sass"


const Map = ({map}) => <Container className={style.rightBlock} id="map" image={map} />

export default Map


const Container = styled.div``
