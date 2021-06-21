import styled from 'styled-components/macro'

const Header = ({ children }) => (
  <HeaderContainer>
    <svg className="check-mark svg-icon me-1 me-lg-2"><use xlinkHref="#check-mark-icon"></use></svg>
    <h1>
      {children}
    </h1>
  </HeaderContainer>
)

const HeaderContainer = styled.header`
  padding: 1vh 0;
`
export default Header
