import { TicketType } from '../../types'
import { Ticket } from '../styles'

type BacklogType = {
  list?: TicketType[];
  openModalWithData: (issue: any, description: any, priorityLevel: any) => void;
}

const BacklogView = ({ list = [], openModalWithData }: BacklogType) => {
  return (
    <div>
      {list?.map((elem) => {
        return (
          <Ticket key={elem.id} onClick={() => {
            openModalWithData(elem.Issue, elem.Description, elem.PriorityLevel)
          }}>
            <div>{elem.Issue}</div>
            <div>{elem.Description}</div>
            <div>{elem.PriorityLevel}</div>
          </Ticket>
        )
      })}
    </div>
  )
}

export default BacklogView