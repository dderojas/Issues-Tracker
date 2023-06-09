import styled from 'styled-components';

const VerticalNav = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  position: fixed;
  background-color: #F5F5F5;
  height: 100%;
  width: 10%;
`
const HorizontalNav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  background-color: rgb(75,0,130);
  color: #4B0082;
  width: 100%;
  padding: 10px 100px 10px 10px;
  z-index: 9999;
  // box-shadow: 0px 5px #D3D3D3;
`

// temporary button
const Button = styled.button`
  background-color: #4CAF50; /* Green */
  border: 1px solid green;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  float: left;
`

export {
  VerticalNav,
  HorizontalNav,
  Button
}