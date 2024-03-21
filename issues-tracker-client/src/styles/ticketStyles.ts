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
`

const Ticket = styled.li`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 5%;
  margin: 2% 0%;
  border-radius: 15px;
  box-shadow: 0 3px 10px rgb(0, 0, 0, 0.35);
  background-color: #eeeeee;
  overflow: auto;
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

const EditResultsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0% 5% 0% 12%;
`

const DoneButton = styled.button`
  display: inline-block;
  outline: none;
  cursor: pointer;
  font-size: 75%;
  line-height: 1;
  border-radius: 500px;
  transition-property: background-color,border-color,color,box-shadow,filter;
  transition-duration: .3s;
  border: solid transparent;
  letter-spacing: 2px;
  min-width: 12%;
  text-transform: uppercase;
  white-space: normal;
  font-weight: 700;
  text-align: center;
  padding: 3% 1% 3%;
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
  Ticket,
  DropDown,
  MenuOptions,
  EditResultsContainer,
  DoneButton
}