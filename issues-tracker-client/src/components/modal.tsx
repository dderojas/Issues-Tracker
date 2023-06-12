import { ModalContainer, ModalBackground } from "../styles";

type ModalPropsType = {
  setOpenModal: (boolean: boolean) => void;
  addTicket: () => void;
}

const Modal = ({ setOpenModal, addTicket }: ModalPropsType) => {
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