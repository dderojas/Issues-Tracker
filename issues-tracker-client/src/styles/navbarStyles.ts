import styled from 'styled-components';

type VerticalNavButtonType = {
  view?: boolean;
  id?: string;
}

const VerticalNav = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  position: fixed;
  background-color: #222831;
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

const VerticalNavButton = styled.button<VerticalNavButtonType>`
  color: white;
  padding: 15% 11%;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  border: none;
  background-color: ${(props) => {
    if (props.id === 'Backlog' && props.view) {
      return '#7a7e83'
    }
    if (props.id === 'Kanban' && !props.view) {
      return '#7a7e83'
    }
    return '#222831'
  }};
  :hover {
    background-color: #7a7e83
  }
`

export {
  VerticalNav,
  HorizontalNav,
  VerticalNavButton
}