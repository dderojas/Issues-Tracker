import styled from 'styled-components';

const VerticalNav = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  background-color: #F5F5F5;
  height: 100vh;
  width: 15vh;
`
const HorizontalNav = styled.header`
  display: flex;
  justify-content: space-around;
  background-color: #4682B4;
  color: #F0FFFF;
  height: 8vh;
  padding-top: 10px;
  box-shadow: 0px 5px #D3D3D3;
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