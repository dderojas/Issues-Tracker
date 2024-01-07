import styled from 'styled-components'

const ModalContainer = styled.div`
  width: 60%;
  height: 70%;
  border-radius: 12px;
  background-color: #eeeeee;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 25px;
  .closeModal {
    width: 20%;
    margin: 0% 2%;
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
  > form {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    > div {
      display: flex;
      justify-content: space-around;
      margin: 2%;
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

export {
  ModalContainer,
  ModalBackground
}