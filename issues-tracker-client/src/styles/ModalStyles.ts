import styled from 'styled-components'
import { Button } from './TicketStyles'

const ModalButton = styled(Button)`
  outline: none;
  cursor: pointer;
  border-radius: 500px;
  min-width: 30%;
  padding: 3% 1% 4%;
`

const CloseModal = styled.button`
  color: inherit;
  background-color: inherit;
  appearance: none;
  border: none;
  cursor: pointer;
`

const TicketModal = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  height: auto;
  border-radius: 3%;
  color: white;
  background-color: #3e3e42;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  text-align: center;
  padding: 2%;
  h2 {
    font-weight: normal;
  }
  .modal-header {
    display: flex;
    justify-content: space-between;
    margin: 0% 2%;
    > input {
      color: white;
      background-color: inherit;
      border: none;
      font-size: 100%;
    }
  }
  .title-class {
    display: inline-block;
    color: white;
    background-color: #737373;
    padding: 2%;
    font-size: 100%;
    margin: 2%;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 10px;
    border-radius: 50px;
    border: none;
  }
  .title-class::placeholder {
    color: #cccccc;
  }
  .description-class {
    display: inline-block;
    background-color: #737373;
    padding: 5%;
    margin: 2%;
    font-size: 120%;
    color: white;
    border-radius: 50px;
    border: none;
    outline: none;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 10px;
  }
  .description-class::placeholder {
    color: #cccccc;
  }
  .button-modal-container {
    display: flex;
    justify-content: space-between;
    margin: 0% 2%;
  }
  > form {
    display: flex;
    flex-direction: column;
    margin: 2%;
    font-size: 120%;
  }
  .input-and-dropdowns {
    display: flex;
    justify-content: space-around;
    margin: 2%;
    > input {
      color: white;
      background-color: #737373;
      border-radius: 50px;
      padding: 2% 3%;
      margin: 0% 0.5%;
      border: none;
      outline: none;
      font-size: 75%;
      min-width: 30%;
      box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 10px;
    }
    > input::placeholder {
      color: #cccccc;
    }
    > select {
      color: white;
      background-color: #737373;
      font-size: 100%;
      width: 30%;
      border-radius: 50px;
      margin: 0% 0.5%;
      padding: 1%;
      box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 10px;
      border: none;
    }
  }
`

const ModalBackground = styled.div`
  width: 100vw;
  height: 100vh;
  backdrop-filter: blur(2px);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`

const LoginBackground = styled.div`
  background-color: #252526;
  height: 100%;
  width: 100%;
  .intro-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  h3 {
    color: white;
    margin: 0%;
    font-weight: normal;
  }
`

const LoginButtons = styled(Button)`
  border-radius: 500px;
  min-width: 30%;
  text-align: center;
  padding: 3% 1% 4%;
`

const LoginModal = styled.div`
  display: flex;
  flex-direction: column;
  width: 35%;
  height: 65%;
  border-radius: 3%;
  background-color: #3e3e42;
  color: white;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  text-align: center;
  padding: 2% 1% 5%;
  h1 {
    font-weight: normal;
  }
  > form {
    display: flex;
    flex-direction: column;
    margin: 5% 10%;
    width: 80%;
    > input {
      margin: 1% 0%;
      padding: 4%;
      font-size: 150%;
      border-radius: 50px;
      border: none;
      color: white;
      background-color: #737373;
    }
    > input::placeholder {
      color: #cccccc;
    }
    >.login-buttons-container {
      display: flex;
      flex-direction: column;
      margin: 5% 0%;
    }
  }
`

const DateFont = styled.span<{ $color?: string; }>`
  color: ${props => props.$color || 'black' };
`

export {
  TicketModal,
  ModalBackground,
  DateFont,
  LoginModal,
  LoginBackground,
  ModalButton,
  LoginButtons,
  CloseModal
}