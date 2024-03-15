//@ts-nocheck
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { Item, BacklogState, ActionType } from '../../types'
import { Ticket, BacklogBoard, DateFont, DropDown, EllipsisMenu, MenuOptions } from '../styles'
import { ACTIONS } from '../reducers/issuesReducer'
import { calculateDaysFunc } from '../utils/calculateDays'

type BacklogType = {
  list?: BacklogState;
  openModalWithData: ({ 
    Title, 
    Assignee, 
    Description, 
    TicketStatus, 
    IssueType, 
    TicketId 
  }: Item) => void;
  dispatch: ({ type, backlogPayload }: ActionType) => void;
  deleteTicket: () => void;
}

const BacklogView = ({ list = { backlog: [], filteredLog: [], selectedTickets: [], filteredView: false, menuView: false, filterDropdown: false, deleteView: false }, openModalWithData, dispatch, deleteTicket }: BacklogType) => {

  const handleFilterChange = (e: React.FormEvent<HTMLSelectElement>) => {
    e.preventDefault()
    let value:string = (e!.target as HTMLSelectElement)!.value;
    let name: string = (e!.target as HTMLSelectElement)!.name;

    if (value === 'All') {
      dispatch({ type: ACTIONS.UPDATE_BACKLOG, backlogPayload: { filteredView: false } })
      return;
    }

    if (name === 'typeDropdown') {
      dispatch({ type: ACTIONS.UPDATE_BACKLOG, backlogPayload: { issueTypeFilter:  value, filteredView: true } })
    }
  }
  
  const handleMenuView = (e: any) => {
    e.preventDefault()
    console.log(e.target.id, 'asdfasdfasfdafd')
    if (e.target.id === 'EllipsisMenu') {

      dispatch({ type: ACTIONS.UPDATE_BACKLOG, backlogPayload: { menuView: !list.menuView } })

    }

    if (e.target.id === 'FilterDropdown') {

      dispatch({ type: ACTIONS.UPDATE_BACKLOG, backlogPayload: { filterDropdown: !list.filterDropdown } })

    }

    if (e.target.id === 'DeleteView') {

      dispatch({ type: ACTIONS.UPDATE_BACKLOG, backlogPayload: { deleteView: !list.deleteView } })
    
    }
  }

  const handleToggleSelectedItem = (TicketId) => {
    const isSelected = list.selectedTickets.includes(TicketId);
    if (isSelected) {
      dispatch({ type: ACTIONS.UPDATE_BACKLOG, backlogPayload: { selectedTickets: list.selectedTickets.filter((id) => id !==TicketId) } })
    } else {
      dispatch({ type: ACTIONS.UPDATE_BACKLOG, backlogPayload: { selectedTickets: [...list.selectedTickets, TicketId] } })
    }
  }

  const view = list.filteredView ? 'filteredLog' : 'backlog'

  return (
    <BacklogBoard>
      <EllipsisMenu onClick={handleMenuView}>
        <div id="EllipsisMenu">
          <FontAwesomeIcon icon={faEllipsisV} />
        </div>
        {list.menuView && 
          <MenuOptions>
            <li id="FilterDropdown" onClick={handleMenuView}>Filter Dropdown</li>
            <li id="DeleteView">Delete</li>
          </MenuOptions>
        }
      </EllipsisMenu>
      {list.filterDropdown &&
        <DropDown name="typeDropdown" onChange={handleFilterChange}>
          <option>All</option>
          <option>Task</option>
          <option>Feature</option>
          <option>Bug</option>
        </DropDown>
      }
      {list.deleteView &&
        <button onClick={() => { deleteTicket({ selectedTickets: list.selectedTickets }) }}>DELETE</button>
      }
      { list[view]?.map(({ Assignee, Description, IssueType, TicketStatus, TicketId, Title, DueDate = '' }: Item) => {
        let { formattedDeadline, differenceInDays } = calculateDaysFunc(DueDate)

        const dateColor = !differenceInDays || differenceInDays > 2 ? 'black' : 'red'
        
        return (
          <Ticket key={Math.random()}>
            {list.deleteView && 
              <input type="checkbox"              
                checked={list.selectedTickets.includes(TicketId)}
                onChange={() => handleToggleSelectedItem(TicketId)}
              />}
            <div>{Title}</div>
            <div>{IssueType}</div>
            <footer>
              <div>{Assignee}</div>
              <DateFont $color={dateColor}>{formattedDeadline}</DateFont>
            </footer>
            <div onClick={() => {
            openModalWithData({ Title, Assignee, Description, TicketStatus, IssueType, TicketId, DueDate })
          }}>EDIT</div>
          </Ticket>
        )
      }) }
    </BacklogBoard>
  )
}

export default BacklogView