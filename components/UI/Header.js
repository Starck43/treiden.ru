import styled from 'styled-components/macro'

const Header = ({ children }) => (
  <header className='mt-4'>
    <svg className="check-mark svg-icon me-1 me-lg-2"><use xlinkHref="#check-mark-icon"></use></svg>
    <h1>
      {children}
    </h1>
  </header>
)

export default Header
