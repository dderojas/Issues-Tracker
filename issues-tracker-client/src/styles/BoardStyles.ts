import styled from 'styled-components';

const BacklogBoard = styled.div`
  background-color: #393e46;
  // height: 100%;
  > ul {
    display: flex;
    flex-direction: column;
    padding: 0% 5% 0% 12%;
    height: 100%;
    // overflow: scroll;
  }
`
const BacklogNav = styled.nav`
  display: flex;
  justify-content: space-between;
  padding: 1% 5% 1% 12%;
  > #ellipsisMenuStyling {
    cursor: pointer;
    > path {
      pointer-events: none;
    }
  }
`

const BacklogList = styled.ul`` // not sure if I'll need this

const SprintBoard = styled.div`
  display: flex;
  justify-content: space-around;
  height: 100%;
  background-color: #393e46;
  padding-left: 10%;
  padding-top: 5%;
  padding-bottom: 3%;
`

const Columns = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #0092ca;
  padding: 1%;
  height: 100%;
  border-radius: 15px;
  box-shadow: 0 3px 10px rgb(0, 0, 0, 0.35);
  width: 18%;
`

export {
  BacklogBoard,
  BacklogList,
  BacklogNav,
  Columns,
  SprintBoard
}