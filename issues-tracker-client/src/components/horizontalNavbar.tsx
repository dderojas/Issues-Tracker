import styled from 'styled-components'

const HorizontalNav = styled.header`
  display: flex;
  justify-content: space-around;
  background-color: #4682B4;
  color: #F0FFFF;
  height: 8vh;
  padding-top: 10px;
  box-shadow: 0px 5px #D3D3D3;
`
;
type Props = {
  children: JSX.Element[]
}

const HorizontalNavbar = ({ children }: Props) => {
  return (
    <HorizontalNav>
      {children}
    </HorizontalNav>
  )
}

export default HorizontalNavbar