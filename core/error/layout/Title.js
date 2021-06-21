import styled from 'styled-components/macro'

const Title = styled.h2`
  margin: 1em;
  color: ${props => props.theme.colors.colorDark};
  font-family: ${props => props.theme.fonts.fontSans};
  font-size: ${props => props.theme.fontSizes.XXL};
  font-weight: bold;
  text-transform: uppercase;
`
export default Title
