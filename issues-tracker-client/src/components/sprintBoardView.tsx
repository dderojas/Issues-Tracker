import { SprintBoard, Columns } from '../styles'
import { SprintBoardState, Item } from '../../types'

type SprintBoardType = {
  sprintBoardState: SprintBoardState;
  openModalWithData: ({ Title, Assignee, Description, TicketStatus, IssueType, TicketId }: Item) => void;
}

const SprintBoardView = ({ sprintBoardState }: SprintBoardType) => {
  const kanbanBoardStateArr = Object.keys(sprintBoardState)

  return (
    <SprintBoard>
      {kanbanBoardStateArr.map((elem) => {
        return <Columns>{sprintBoardState[elem]}</Columns>
      })}
    </SprintBoard>
  )
}

export {
  SprintBoardView
}