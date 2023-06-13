import { useState } from 'react';
import { ModalContainer, ModalBackground } from "../styles";

type ModalPropsType = {
  setOpenModal: (boolean: boolean) => void;
  addTicket: (state: any) => void;
}

const Modal = ({ setOpenModal, addTicket }: ModalPropsType) => {
  const [formState, setFormState] = useState({ issue: '', description: ''})


  const handleChange = (e: any) => {
    e.preventDefault()
    setFormState({ ...formState, [e.target.name]: e.target.value})
  }

  

  return (
    <ModalBackground>
      <ModalContainer>
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            Close Modal
          </button>
        </div>
        <h1>Create a Ticket</h1>
        <form onSubmit={addTicket}>
          <input name="issue" type="text" value={formState.issue} onChange={handleChange} />
          <input name="description" type="text" value={formState.description} onChange={handleChange} />
          <button>add item</button>
        </form>
      </ModalContainer>
    </ModalBackground>
  );
}

export default Modal;