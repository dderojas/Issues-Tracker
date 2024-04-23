import styled from 'styled-components';

const BacklogBoard = styled.div`
  background-color: #252526;
  overflow: hidden;
  height: 100%;
  padding-bottom: 10%;
`
const BacklogNav = styled.nav`
  display: flex;
  padding: 1% 5% 1% 12%;
  > .actions {
    cursor: pointer;
  }
`

const BacklogList = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 0% 5% 10% 12%;
  height: 100%;
  width: 75%;
  overflow-y: auto;
  scrollbar-width: none;
`

const KanbanBoard = styled.div`
  display: flex;
  justify-content: space-around;
  height: 100%;
  background-color: #0e1111;
  padding-left: 10%;
  padding-top: 5%;
  padding-bottom: 3%;
`

const Columns = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
  background-color: #252526;
  padding: 1%;
  border-radius: 15px;
  width: 18%;
`

const KanbanTicketContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: auto;
  scrollbar-width: none;
  width: 100%;
`

export {
  BacklogBoard,
  BacklogList,
  BacklogNav,
  Columns,
  KanbanBoard,
  KanbanTicketContainer
}