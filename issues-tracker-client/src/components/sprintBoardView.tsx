import { useState } from 'react'
import { SprintBoard, Columns, Ticket } from '../styles'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const isPositionChanged = (destination: any, source: any) => {
  if (!destination) return false;
  const isSameList = destination.droppableId === source.droppableId;
  const isSamePosition = destination.index === source.index;
  return !isSameList || !isSamePosition;
};

const SprintBoardView = (props:any) => {
  const [something, updateSomething] = useState([{ id: 'anakin' }, { id: 'obiwan' }])

  const handleOnDragEnd = ({ draggableId, destination, source }: any) => {
    console.log('in dragend!!!')
    if (!isPositionChanged(source, destination)) return;

    const issueId = Number(draggableId);
    console.log(issueId, 'issueId11')
    // api.optimisticUpdate(`/issues/${issueId}`, {
    //   updatedFields: {
    //     status: destination.droppableId,
    //     listPosition: calculateIssueListPosition(project.issues, destination, source, issueId),
    //   },
    //   currentFields: project.issues.find(({ id }) => id === issueId),
    //   setLocalData: fields => updateLocalProjectIssues(issueId, fields),
    // });
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <SprintBoard>
        <Droppable key={'todo'} droppableId='todo'>
          { provided => (
            <Columns {...provided.droppableProps} ref={provided.innerRef}>
              <Draggable draggableId={something[0].id.toString()} index={0}>
                {(provided, snapshot) => (
                  <Ticket {...provided.draggableProps} {...provided.dragHandleProps}>
                    <div>you were the chosen one!</div>
                  </Ticket>
                )}
              </Draggable>
              {provided.placeholder}
            </Columns>
          )}
        </Droppable>
        <Droppable key={''} droppableId=''>
          { provided => (
            <Columns>
                  <Ticket>
                    <div>hello there</div>
                  </Ticket>
            </Columns>
          )}
        </Droppable>
        <Droppable key={''} droppableId=''>
          { provided => (
            <Columns>
                  <Ticket>
                    <div>you will tryyy</div>
                  </Ticket>
            </Columns>
          )}
        </Droppable>
      </SprintBoard>
    </DragDropContext>
        //   <SprintBoard>
        //   <Columns>
        //     {props.sprintBoardState.todo?.map((elem:any) => {
        //       return (
        //         <Ticket onClick={() => {
        //           props.openModalWithData(elem.Assignee, elem.Description, elem.PriorityLevel, elem.TicketStatus, elem.IssueType, elem.TicketId)
        //         }}>
        //           <div>{elem.Assignee}</div>
        //           <div>{elem.Description}</div>
        //           <div>{elem.PriorityLevel}</div>
        //           <div>{elem.IssueType}</div>
        //           <div>{elem.TicketStatus}</div>
        //         </Ticket>
        //       )
        //     })}
        //   </Columns>
        //   <Columns>
        //     {props.sprintBoardState.inProgress?.map((elem:any) => {
        //       return (
        //         <Ticket onClick={() => {
        //           props.openModalWithData(elem.Assignee, elem.Description, elem.PriorityLevel, elem.TicketStatus, elem.IssueType, elem.TicketId)
        //         }}>
        //           <div>{elem.Assignee}</div>
        //           <div>{elem.Description}</div>
        //           <div>{elem.PriorityLevel}</div>
        //           <div>{elem.IssueType}</div>
        //           <div>{elem.TicketStatus}</div>
        //         </Ticket>
        //       )
        //     })}
        //   </Columns>
        //   <Columns>
        //     {props.sprintBoardState.done?.map((elem:any) => {
        //       return (
        //         <Ticket onClick={() => {
        //           props.openModalWithData(elem.Assignee, elem.Description, elem.PriorityLevel, elem.TicketStatus, elem.IssueType, elem.TicketId)
        //         }}>
        //           <div>{elem.Assignee}</div>
        //           <div>{elem.Description}</div>
        //           <div>{elem.PriorityLevel}</div>
        //           <div>{elem.IssueType}</div>
        //           <div>{elem.TicketStatus}</div>
        //         </Ticket>
        //       )
        //     })}
        //   </Columns>
        // </SprintBoard>
  )
}

export {
  SprintBoardView
}