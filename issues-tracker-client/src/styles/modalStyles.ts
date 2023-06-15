import styled from 'styled-components'

const ModalContainer = styled.div`
  width: 500px;
  height: 500px;
  border-radius: 12px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  display: flex;
  flex-direction: column;
  padding: 25px;
  > form, div, h1 {
    text-align: center;
    margin-top: 10px;
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