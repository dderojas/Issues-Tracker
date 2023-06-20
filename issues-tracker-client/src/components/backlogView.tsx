import { TicketType } from '../../types'
import { Ticket } from '../styles'

type BacklogType = {
  list?: TicketType[];
  openModalWithData: (issue: any, description: any, id: any) => void;
}

const BacklogView = ({ list, openModalWithData }: BacklogType) => {

  return (
    <div>
      {list?.map((elem) => {
        return (
          <Ticket key={elem.id} onClick={() => {
            openModalWithData(elem.issue, elem.description, elem.id)
          }}>
            <div>{elem.issue}</div>
            <div>{elem.description}</div>
          </Ticket>
        )
      })}
    </div>
  )
}

export default BacklogView