// @ts-nocheck
import { Item, DispatchType } from '../../types'
import { Ticket, BacklogBoard } from '../styles'
import { ACTIONS } from './issuesTracker'

type BacklogType = {
  list?: { backlog?: Item[], filteredLog?: Item[] };
  openModalWithData: ({ 
    Title, 
    Assignee, 
    Description, 
    TicketStatus, 
    IssueType, 
    TicketId 
  }: Item) => void;
  dispatch: ({ type, backlogPayload }: DispatchType) => void;
  setFilteredView: (something: boolean) => void;
  filteredView: boolean;
}

const BacklogView = ({ list = { backlog: [], filteredLog: [] }, openModalWithData, dispatch, setFilteredView, filteredView }: BacklogType) => {

  const handleChange = (e) => {
    e.preventDefault()

    if (e.target.value === 'All') {
      setFilteredView(false)
      return;
    }

    const filteredItems = list.backlog.filter((elem) => {
      return elem.IssueType === e.target.value;
    })

    dispatch({ type: ACTIONS.UPDATE_BACKLOG, backlogPayload: { filteredLog: filteredItems } })
    setFilteredView(true)
  }
  return (
    <BacklogBoard>
      <select onChange={handleChange}>
        <option name="All">All</option>
        <option name="Task">Task</option>
        <option name="Feature">Feature</option>
        <option name="Bug">Bug</option>
      </select>
      { filteredView ? list.filteredLog.map(({ Assignee, Description, IssueType, TicketStatus, TicketId, Title, DueDate }: Item) => {
        return (
          <Ticket key={Math.random()} onClick={() => {
            openModalWithData({ Title, Assignee, Description, TicketStatus, IssueType, TicketId, DueDate })
          }}>
            <div>{Title}</div>
            <div>{IssueType}</div>
            <footer>
              <div>{Assignee}</div>
              <div>{DueDate}</div>
            </footer>
          </Ticket>
        )
      }) : list.backlog.map(({ Assignee, Description, IssueType, TicketStatus, TicketId, Title, DueDate }: Item) => {
        return (
          <Ticket key={Math.random()} onClick={() => {
            openModalWithData({ Title, Assignee, Description, TicketStatus, IssueType, TicketId, DueDate })
          }}>
            <div>{Title}</div>
            <div>{IssueType}</div>
            <footer>
              <div>{Assignee}</div>
              <div>{DueDate}</div>
            </footer>
          </Ticket>
        )
      })}
    </BacklogBoard>
  )
}

export default BacklogView