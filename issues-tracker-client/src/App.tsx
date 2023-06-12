import { useState, useReducer } from 'react'
import { HorizontalNavbar } from './components';
import { VerticalNavbar } from './components'
import { BacklogView } from './components'
import { Button } from './styles';
import { Modal } from './components';


type ActionType = {
  type?: string;
  payload: { item: string }
}

const reducerSomething = (state: string[], action: ActionType) => {
  return [...state, action.payload.item]
}

const App = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [showBacklog, setBacklog] = useState(false)

  const [state, dispatch] = useReducer(reducerSomething, [])


  const addTicket = () => {
    dispatch({ payload: { item: 'heloooooo' } })
  }

  return (
    <>
        <HorizontalNavbar>
          <Button>put item</Button>
          <Button>Sign In/Register</Button>
        </HorizontalNavbar>
        <VerticalNavbar>
          <Button onClick={() => {
            setBacklog(!showBacklog)
          }}>Backlog</Button>
          <Button>delete item</Button>
          <Button onClick={() => setModalOpen(true)}>Create Ticket</Button>
        </VerticalNavbar>
        {modalOpen && <Modal addTicket={addTicket} setOpenModal={setModalOpen}/>}
      <div style={{ display: 'flex', paddingLeft: '12%', paddingTop: '7%' }}>
        { showBacklog && <BacklogView list={state}/> }
      </div>
    </>
  );
}

export default App;
