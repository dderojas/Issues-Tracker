//@ts-nocheck
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { Item, BacklogState, ActionType } from '../../types'
import { 
  BacklogTicket,
  BacklogBoard, 
  BacklogList, 
  BacklogNav, 
  DateFont, 
  DropDown, 
  MenuOptions, 
  EditResultsContainer,
  DoneButton
} from '../styles'
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
    console.log(e.target, 'asdfasdfasfdafd')
    if (e.target.id === 'ellipsisMenu') {
      
      dispatch({ type: ACTIONS.UPDATE_BACKLOG, backlogPayload: { menuView: !list.menuView } })

    }

    if (e.target.id === 'FilterDropdown') {

      dispatch({ type: ACTIONS.UPDATE_BACKLOG, backlogPayload: { menuView: false, filterDropdown: !list.filterDropdown, deleteView: false } })

    }

    if (e.target.id === 'DeleteView') {

      dispatch({ type: ACTIONS.UPDATE_BACKLOG, backlogPayload: { menuView: false, deleteView: !list.deleteView, filterDropdown: false } })
    
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

  const handleDone = () => {
    dispatch({ type: ACTIONS.UPDATE_BACKLOG, backlogPayload: { menuView: false, deleteView: false, filterDropdown: false }})
  }

  const view = list.filteredView ? 'filteredLog' : 'backlog'

  return (
    <BacklogBoard>
      <BacklogNav>
        <h3>Backlog</h3>
            <div id="ellipsisMenuStyling" onClick={handleMenuView}>
              <FontAwesomeIcon id="ellipsisMenu" icon={faEllipsisV} size="2xl"/>
            </div>
            {list.menuView && 
              <MenuOptions>
                <li id="FilterDropdown" onClick={handleMenuView}>Filter Dropdown</li>
                <li id="DeleteView" onClick={handleMenuView}>Delete</li>
              </MenuOptions>
            }
      </BacklogNav>
      {list.filterDropdown &&
        <EditResultsContainer>
          <DropDown name="typeDropdown" onChange={handleFilterChange}>
            <option>All</option>
            <option>Task</option>
            <option>Feature</option>
            <option>Bug</option>
          </DropDown>
          <DoneButton onClick={handleDone}>Done</DoneButton>
        </EditResultsContainer>
      }
      {list.deleteView &&
        <EditResultsContainer>
          <DoneButton onClick={() => { deleteTicket({ selectedTickets: list.selectedTickets }) }}>DELETE</DoneButton>
          <DoneButton onClick={handleDone}>Done</DoneButton>
        </EditResultsContainer>
      }
      <BacklogList>
        { list[view]?.map(({ Assignee, Description, IssueType, TicketStatus, TicketId, Title, DueDate = '' }: Item) => {
          let { formattedDeadline, differenceInDays } = calculateDaysFunc(DueDate)

          const dateColor = !differenceInDays || differenceInDays > 2 ? 'black' : 'red'
          
          return (
            <BacklogTicket key={Math.random()}>
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
            </BacklogTicket>
          )
        }) }
      </BacklogList>
    </BacklogBoard>
  )
}

export default BacklogView