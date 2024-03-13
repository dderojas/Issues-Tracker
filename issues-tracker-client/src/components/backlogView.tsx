import { Item, BacklogState, ActionType } from '../../types'
import { Ticket, BacklogBoard, DateFont, DropDown } from '../styles'
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
}

const BacklogView = ({ list = { backlog: [], filteredLog: [], filteredView: false }, openModalWithData, dispatch }: BacklogType) => {

  const handleChange = (e: React.FormEvent<HTMLSelectElement>) => {
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
  
  const view = list.filteredView ? 'filteredLog' : 'backlog'

  return (
    <BacklogBoard>
      <DropDown name="typeDropdown" onChange={handleChange}>
        <option>All</option>
        <option>Task</option>
        <option>Feature</option>
        <option>Bug</option>
      </DropDown>
      { list[view]?.map(({ Assignee, Description, IssueType, TicketStatus, TicketId, Title, DueDate = '' }: Item) => {
        let { formattedDeadline, differenceInDays } = calculateDaysFunc(DueDate)
        //@ts-ignore
        const dateColor = differenceInDays < 2 ? 'red' : 'black'
        
        return (
          <Ticket key={Math.random()} onClick={() => {
            openModalWithData({ Title, Assignee, Description, TicketStatus, IssueType, TicketId, DueDate })
          }}>
            <div>{Title}</div>
            <div>{IssueType}</div>
            <footer>
              <div>{Assignee}</div>
              <DateFont $color={dateColor}>{formattedDeadline}</DateFont>
            </footer>
          </Ticket>
        )
      }) }
    </BacklogBoard>
  )
}

export default BacklogView