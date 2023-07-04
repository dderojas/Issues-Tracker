import { Item } from '../../types'
import { Ticket } from '../styles'

type BacklogType = {
  list?: Item[];
  openModalWithData: (assignee: string, description: string, priorityLevel: string, status: string, issueType: string) => void;
}

const BacklogView = ({ list = [], openModalWithData }: BacklogType) => {
  console.log(list, 'list!!!!')
  return (
    <div>
      {list?.map((elem: Item) => {
        return (
          <Ticket key={elem.TicketId} onClick={() => {
            openModalWithData(elem.Assignee, elem.Description, elem.PriorityLevel, elem.Status, elem.IssueType)
          }}>
            <div>{elem.Assignee}</div>
            <div>{elem.Description}</div>
            <div>{elem.PriorityLevel}</div>
            <div>{elem.IssueType}</div>
            <div>{elem.Status}</div>
          </Ticket>
        )
      })}
    </div>
  )
}

export default BacklogView