import styled from 'styled-components';

const VerticalNav = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  position: fixed;
  background-color: #222831;
  > button {
    background-color: inherit;
  }
  height: 100%;
  width: 10%;
  overflow: auto;
`
const HorizontalNav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  background-color: rgb(75,0,130);
  color: #4B0082;
  width: 100%;
  padding: 10px 10px 10px 10px;
  z-index: 9999;
  border-color: black;
  border-style: solid;
`

const Button = styled.button`
  color: white;
  padding: 15% 11%;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  border: none;
  :hover {
    background-color: #7a7e83
  }
`

export {
  VerticalNav,
  HorizontalNav,
  Button
}