import { KanbanBoard, Columns, KanbanTicketContainer } from '../styles'
import { KanbanBoardState, Item } from '../../types'

type KanbanBoardType = {
  kanbanBoardState: KanbanBoardState;
  openModalWithData: ({ Title, Assignee, Description, TicketStatus, IssueType, TicketId }: Item) => void;
}

const KanbanBoardView = ({ kanbanBoardState }: KanbanBoardType) => {
  const kanbanBoardStateArr = Object.keys(kanbanBoardState)

  return (
    <KanbanBoard>
      {kanbanBoardStateArr.map((elem) => {
        return (
          <Columns>
            <h4 style={{ margin: '1% 1% 3%' }}>
            {elem}
            </h4>
            <KanbanTicketContainer>
              {kanbanBoardState[elem]}
            </KanbanTicketContainer>
          </Columns>
        )
      })}
    </KanbanBoard>
  )
}

export {
  KanbanBoardView
}