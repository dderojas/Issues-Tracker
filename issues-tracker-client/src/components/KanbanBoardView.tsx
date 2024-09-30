import { KanbanBoard, Columns, KanbanTicketContainer, KanbanTicket } from '../styles'
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
        if (kanbanBoardState['Todo'].length === 0 && kanbanBoardState['Ongoing'].length === 0 && kanbanBoardState['Done'].length === 0) {
          if (elem === 'Todo') {
           return (
              <Columns>
                <h4 style={{ margin: '1% 1% 3%' }}>
                {elem}
                </h4>
                <KanbanTicketContainer>
                  <KanbanTicket>
                    <div className="kanban-ticket-header">
                      <span className="kanban-ticket-assignee">No Tickets yet!</span>
                    </div>
                    <div className="issue-type-container-kanban">Create a ticket in the navigation bar</div>
                  </KanbanTicket>
                </KanbanTicketContainer>
              </Columns>
           )

          }
        }

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