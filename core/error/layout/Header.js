import styled from 'styled-components'


const Header = ({ children }) => {
  return (
    <Container>
      <Style>{children}</Style>
    </Container>
  )
}

export default Header


const Container = styled.div`
  height: 280px;
  position: relative;
  z-index: -1;

  @media only screen and (max-width: 767px) {
    height: 142px;
  }
`
const Style = styled.h1`
  @media only screen and (max-width: 767px) {
    font-size: 112px;
  }

  position: absolute;
  font-size: 230px;
  margin: 0;
  font-weight: 900;
  left: 50%;
  background: url("/public/images/oops.webp") no-repeat center;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: cover;
  transform: translateX(-50%);
`
