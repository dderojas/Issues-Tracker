import { ModalContainer } from "../styles";
// @ts-ignore
const Modal = ({ setOpenModal }) => {
  return (
    <div className="modalBackground">
      <ModalContainer>
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className="title">
          <h1>Are You Sure You Want to Continue?</h1>
        </div>
        HEY
      </ModalContainer>
    </div>
  );
}

export default Modal;