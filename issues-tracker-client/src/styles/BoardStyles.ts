import styled from 'styled-components';

const BacklogBoard = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 12%;
  padding-right: 5%;
  padding-top: 8%;
  height: 1000px;
  background-color: #2F4F4F;
  overflow: auto;
`

const SprintBoard = styled.div`
  display: flex;
  justify-content: space-around;
  height: 100%;
  background-color: #A9A9A9;
  padding-left: 10%;
  padding-top: 7%;
`

const Columns = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #6495ED;
  padding: 1%;
  height: 100%;
  border-color: black;
  border-style: solid;
  width: 200px;
`

export {
  BacklogBoard,
  Columns,
  SprintBoard
}