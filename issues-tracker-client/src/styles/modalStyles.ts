import styled from 'styled-components'

const TicketModal = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  height: auto;
  border-radius: 3%;
  background-color: #eeeeee;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  text-align: center;
  padding: 2%;
  .modalHeader {
    display: flex;
    justify-content: space-between;
    margin: 0% 2%;
    > input {
      background-color:#eeeeee;
      border: none;
      font-weight: 700;
      font-size: 100%;
    }
  }
  .TitleClass {
    display: inline-block;
    padding: 2%;
    font-size: 100%;
    margin: 2%;
  }
  .DescriptionClass {
    display: inline-block;
    padding: 5%;
    margin: 2%;
  }
  .buttonModalContainer {
    display: flex;
    justify-content: space-between;
    margin: 0% 2%;
    > button {
      display: inline-block;
      outline: none;
      cursor: pointer;
      font-size: 75%;
      line-height: 1;
      border-radius: 500px;
      transition-property: background-color,color;
      transition-duration: .3s;
      border: solid transparent;
      letter-spacing: 2px;
      min-width: 30%;
      text-transform: uppercase;
      white-space: normal;
      font-weight: 700;
      text-align: center;
      padding: 3% 1% 4%;
      color: #616467;
      box-shadow: inset 0 0 0 2px #616467;
      background-color: transparent;
      height: 90%;
      :hover{
          color: #fff;
          background-color: #616467;
      }
    }
  }
  > form {
    display: flex;
    flex-direction: column;
    margin: 2%;
    font-size: 120%;
    > textarea {
      font-size: 120%;
      color: #111;
      border-radius: 50px;
      padding: 2% 3%;
      margin: 0% 0.5%;
      border: none;
      outline: none;
      box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 10px;
    }
    > input {
      box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 10px;
      border-radius: 50px;
      border: none;
    }
    > div {
      display: flex;
      justify-content: space-around;
      margin: 2%;
    }
  }
  .inputAndDropdowns {
    > input {
      color: #111;
      border-radius: 50px;
      padding: 2% 3%;
      margin: 0% 0.5%;
      border: none;
      outline: none;
      font-size: 75%;
      min-width: 30%;
      box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 10px;
    }
    > select {
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

const LoginModal = styled.div`
  display: flex;
  flex-direction: column;
  width: 35%;
  height: 65%;
  border-radius: 3%;
  background-color: #eeeeee;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  text-align: center;
  padding: 2% 1% 5%;
  > form {
    display: flex;
    flex-direction: column;
    margin: 5% 10%;
    width: 80%;
    > input {
      margin: 1% 0%;
      padding: 4%;
      font-size: 150%;
      // box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 10px;
      border-radius: 50px;
      border: none;
    }
    > button {
      margin: 1% 0%;
      font-size: 150%;
      box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 10px;
      border-radius: 50px;
      border: none;
      cursor: pointer;
      :active {
        background-color: #eeeeee;
        box-shadow: 0 5px #666;
        transform: translateY(1px);
      }
    }
  }
`

const DateFont = styled.p<{ $color?: string; }>`
  color: ${props => props.$color || 'black' };
`

export {
  TicketModal,
  ModalBackground,
  DateFont,
  LoginModal
}