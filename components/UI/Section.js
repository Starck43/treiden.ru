import React from 'react'
import { Container } from 'react-bootstrap'

const Section = ({ id, className, children }) => (
  <section id={id} className={className}>
    <Container>
      {children}
    </Container>
  </section>
)


export default Section