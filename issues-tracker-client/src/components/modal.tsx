import { ModalContainer, ModalBackground } from "../styles";
// @ts-ignore
const Modal = ({ setOpenModal, addTicket }) => {
  return (
    <ModalBackground>
      <ModalContainer>
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
          <button onClick={() => {
            addTicket()
          }}>add item</button>
        </div>
        <div className="title">
          <h1>Are You Sure You Want to Continue?</h1>
        </div>
      </ModalContainer>
    </ModalBackground>
  );
}

export default Modal;