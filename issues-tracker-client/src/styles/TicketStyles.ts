import styled from 'styled-components';

const DropDown = styled.select`
  width: 50%;
  height: 50px;
  margin: 1% 0;
  padding: 0% 2%;
  font-size: 120%;
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 10px;
  border: none;
  color: white;
  background-color: #3e3e42;
`

const BacklogTicket = styled.li`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 2% 3%;
  margin: 2% 0%;
  border-radius: 15px;
  box-shadow: 0 3px 10px rgb(0, 0, 0, 0.35);
  color: white;
  background-color: #3e3e42;
  input[type="checkbox"] {
    margin: 1%;
  }
  >.backlog-ticket-content-container {
    display: flex;
    flex-direction: column;
    padding: 0% 3%;
    width: 100%;
    >.backlog-ticket-header {
      display: flex;
      justify-content: space-between;
    };
    >.issue-type-container-backlog {
      font-style: italic;
      margin: 2% 0%;
    }
    > footer {
      display: flex;
      justify-content: space-between;
      border-top: 2px solid #616467;
      margin-top: 3%;
      padding-top: 3%;
      > div {
        cursor: pointer;
      }
    }
  }
`

const KanbanTicket = styled(BacklogTicket)`
  flex-direction: column;
  padding: 10%;
  .kanban-ticket-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;
    .kanban-ticket-assignee {
      margin-right: 15%;
    }
    .kanban-ticket-title {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-weight: bold;
    }
  }
  .issue-type-container-kanban {
    margin: 10% 0%;
    font-style: italic;
  }
  > footer {
    display: flex;
    justify-content: space-between;
    border-top: 2px solid #616467;
    padding-top: 10%;
  }
`

const MenuOptions = styled.ul`
  position: absolute;
  list-style-type: none;
  top: 2%;
  left: 24%;
  background-color: transparent;
  border: 1px solid #ccc;
  border-radius: 15px;
  padding: 0%;
  width: 10%;
  margin: 0;
  > li {
    text-align: center;
    color: #616467;
    cursor: pointer;
    border-radius: 15px;
    transition-property: background-color,color;
    transition-duration: .3s;
    padding 3%;
    :hover{
      color: #fff;
      background-color: #616467;
    }
  }
`

const EditResultsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0% 5% 0% 12%;
`

const Button = styled.button`
  display: inline-block;
  outline: none;
  cursor: pointer;
  font-size: 75%;
  line-height: 1;
  border-radius: 15px;
  transition-property: background-color,color;
  transition-duration: .3s;
  border: solid transparent;
  letter-spacing: 2px;
  min-width: 12%;
  text-transform: uppercase;
  white-space: normal;
  font-weight: 700;
  text-align: center;
  padding: 2% 1%;
  color: #616467;
  box-shadow: inset 0 0 0 2px #616467;
  background-color: transparent;
  height: 90%;
  :hover{
      color: #fff;
      background-color: #616467;
  }
`

export {
  KanbanTicket,
  BacklogTicket,
  DropDown,
  MenuOptions,
  EditResultsContainer,
  Button
}