import styled from 'styled-components';


const Ticket = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 5%;
  border-radius: 3px;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
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
export {
  Ticket
}