import { TicketType } from '../../types'
import { Ticket } from '../styles'

type BacklogType = {
  list?: TicketType[];
  openModalWithData: (issue: any, description: any) => void;
}

const BacklogView = ({ list, openModalWithData }: BacklogType) => {
  return (
    <div>
      {list?.map((elem) => {
        return (
          <Ticket onClick={() => {
            openModalWithData(elem.issue, elem.description)
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