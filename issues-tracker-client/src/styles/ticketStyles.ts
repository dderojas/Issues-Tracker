import styled from 'styled-components';

const DropDown = styled.select`
  width: 100%;
  padding: 2%;
  margin: 2%;
  font-size: 120%;
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 10px;
  border: none;
`

const Ticket = styled.li`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 5%;
  margin: 2%;
  border-radius: 15px;
  box-shadow: 0 3px 10px rgb(0, 0, 0, 0.35);
  background-color: #eeeeee;
  overflow: hidden;
  > p {
    margin: 0;
  }
  > footer {
    display: flex;
    justify-content: space-between;
  }
`

const MenuOptions = styled.ul`
  position: absolute;
  list-style-type: none;
  top: 8%;
  right: 8%;
  background-color: #f70776;
  border: 1px solid #ccc;
  padding: 5px 0;
  width: 20%;
  margin: 0;
  > li {
    margin: 1%;
    text-align: center;
  }
`

export {
  Ticket,
  DropDown,
  MenuOptions
}