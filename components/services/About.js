import React, { Fragment } from 'react'
import styled from 'styled-components/macro'

import { Section, Header } from '~/components/UI'
import Anchor from '~/components/UI/Anchor'

import style from "~/styles/about.module.sass"


const About = ({data}) => {
  return (
  <Section className={style.section}>
    <Anchor id='services' />

    {data.map((item) => (
      <Fragment key={item.slug}>
        <Header>
          {item.title}
        </Header>
        <Content className={style.content} dangerouslySetInnerHTML={{ __html: item.description }} />
      </Fragment>
    ))}

  </Section>
)}

export default About

const Content = styled.div``

