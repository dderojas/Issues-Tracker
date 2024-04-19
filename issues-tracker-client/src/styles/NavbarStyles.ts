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
  background-color: #0e1111;
  height: 100%;
  width: 10%;
  overflow: auto;
  border-right: 2px solid #616467;
`

const VerticalNavButton = styled.button<VerticalNavButtonType>`
  padding: 15% 11%;
  text-align: center;
  text-decoration: none;
  transition-property: color;
  transition-duration: .3s;
  color: ${(props) => {
    if (props.id === 'Backlog' && props.view) {
      return '#884DFF'
    }
    if (props.id === 'Kanban' && !props.view) {
      return '#884DFF'
    }
    return 'white'
  }};
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  border: none;
  background-color: #0e1111;
  :hover {
    color: #884DFF
  }
`

export {
  VerticalNav,
  VerticalNavButton
}