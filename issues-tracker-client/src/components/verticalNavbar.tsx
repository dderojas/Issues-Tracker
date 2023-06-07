import styled from 'styled-components'

const VerticalNav = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  background-color: #F5F5F5;
  height: 100vh;
  width: 15vh;
`
;
type Props = {
  children: JSX.Element[]
}

const VerticalNavbar = ({ children }: Props) => {
  return (
    <VerticalNav>
      {children}
    </VerticalNav>
  )
}

export default VerticalNavbar