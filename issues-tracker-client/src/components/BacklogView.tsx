import { Item, BacklogState, ActionType, DeleteTicketType } from '../../types'
import { 
  BacklogTicket,
  BacklogBoard, 
  BacklogList, 
  BacklogNav, 
  DateFont, 
  DropDown, 
  MenuOptions, 
  EditResultsContainer,
  Button,
  NumberOfTasksContainer,
  TaskNumberCards,
  KanbanTicket
} from '../styles'
import { ACTIONS } from '../reducers/issuesReducer'
import { calculateDaysFunc } from '../utils/calculateDays'

type BacklogType = {
  list: BacklogState;
  openModalWithData: ({ 
    Title, 
    Assignee, 
    Description, 
    TicketStatus, 
    IssueType, 
    TicketId 
  }: Item) => void;
  dispatch: ({ type, backlogPayload }: ActionType) => void;
  deleteTicket: ({ selectedTickets }: DeleteTicketType) => void;
}

const BacklogView = ({ 
  list = { 
    backlog: [], 
    filteredLog: [], 
    selectedTickets: [], 
    filteredView: false, 
    menuView: false, 
    filterDropdown: false, 
    deleteView: false, 
    issueTypeFilter: '',
    numberOfTasksCards: { Todo: '0', Ongoing: '0', Done: '0', Backlog: '0' }
  }, openModalWithData, dispatch, deleteTicket }: BacklogType) => {

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
  
  const handleMenuView = (e: React.MouseEvent<HTMLButtonElement|HTMLLIElement>) => {
    e.preventDefault()
    
    if (e.currentTarget.id === 'actions') {
      
      dispatch({ type: ACTIONS.UPDATE_BACKLOG, backlogPayload: { menuView: !list.menuView } })

    }

    if (e.currentTarget.id === 'FilterDropdown') {

      dispatch({ type: ACTIONS.UPDATE_BACKLOG, backlogPayload: { menuView: false, filterDropdown: !list.filterDropdown, deleteView: false } })

    }

    if (e.currentTarget.id === 'DeleteView') {

      dispatch({ type: ACTIONS.UPDATE_BACKLOG, backlogPayload: { menuView: false, deleteView: !list.deleteView, filterDropdown: false } })
    
    }
  }

  const handleToggleSelectedItem = (TicketId: string) => {
    const isSelected:boolean = list.selectedTickets.includes(TicketId);
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
        <Button id='actions' onClick={handleMenuView}>
          ACTIONS
        </Button>
        {list.menuView && 
          <MenuOptions>
            <li id="FilterDropdown" onClick={handleMenuView}>Filter Dropdown</li>
            <li id="DeleteView" onClick={handleMenuView}>Delete</li>
          </MenuOptions>
        }
        <NumberOfTasksContainer>
          <TaskNumberCards>
            <p>
              Todo
            </p>
            <p>
              {list.numberOfTasksCards.Todo}
            </p>
          </TaskNumberCards>
          <TaskNumberCards>
            <p>
              Ongoing
            </p>
            <p>
              {list.numberOfTasksCards.Ongoing}
            </p>
          </TaskNumberCards>
          <TaskNumberCards>
            <p>
              Done
            </p>
            <p>
              {list.numberOfTasksCards.Done}
            </p>
          </TaskNumberCards>
          <TaskNumberCards>
            <p>
              Backlog
            </p>
            <p>
              {list.numberOfTasksCards.Backlog}
            </p>
          </TaskNumberCards>
        </NumberOfTasksContainer>
      </BacklogNav>
      {list.filterDropdown &&
        <EditResultsContainer>
          <DropDown name="typeDropdown" onChange={handleFilterChange}>
            <option>All</option>
            <option>Backlog</option>
            <option>Due Soon</option>
            <option>Task</option>
            <option>Feature</option>
            <option>Bug</option>
          </DropDown>
          <Button onClick={handleDone}>Done</Button>
        </EditResultsContainer>
      }
      {list.deleteView &&
        <EditResultsContainer>
          <Button onClick={() => { deleteTicket({ selectedTickets: list.selectedTickets }) }}>DELETE</Button>
          <Button onClick={handleDone}>Done</Button>
        </EditResultsContainer>
      }
      <BacklogList>
        {list[view].length === 0 ? (
          <BacklogTicket>
            <div className="backlog-ticket-content-container">
              <div className="backlog-ticket-header">
                <div>No Tickets!</div>
              </div>
              <div className='issue-type-container-backlog'>Backlog Tickets go here</div>
            </div>
          </BacklogTicket>
        ) : list[view]?.map(({ Assignee, Description, IssueType, TicketStatus, TicketId, Title, DueDate = '' }: Item) => {
          let { formattedDeadline, differenceInDays } = calculateDaysFunc(DueDate)

          const dateColor = !differenceInDays || differenceInDays > 2 ? '#228B22' : 'red'
          
          return (
            <BacklogTicket key={Math.random()}>
              {list.deleteView && 
              <input type="checkbox"              
                checked={list.selectedTickets.includes(TicketId)}
                onChange={() => handleToggleSelectedItem(TicketId)}
              />}
              <div className="backlog-ticket-content-container">
                <div className="backlog-ticket-header">
                  <div>{Assignee}</div>
                  <div>{Title}</div>
                </div>
                <div className='issue-type-container-backlog'>{IssueType}</div>
                <footer>
                  <div onClick={() => {
                  openModalWithData({ Title, Assignee, Description, TicketStatus, IssueType, TicketId, DueDate })
                  }}>EDIT</div>
                  <DateFont $color={dateColor}>{formattedDeadline}</DateFont>
                </footer>
              </div>
            </BacklogTicket>
          )
        }) }
      </BacklogList>
    </BacklogBoard>
  )
}

export default BacklogView