// @ts-nocheck
import { useState, useEffect } from 'react'
import { SprintBoard, Columns, Ticket } from '../styles'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

// StrictMode solution??
export const StrictModeDroppable = ({ children, ...props }: DroppableProps) => {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));
    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);
  if (!enabled) {
    return null;
  }
  return <Droppable {...props}>{children}</Droppable>;
};


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
console.log(something[0].id.toString(), '????')
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <SprintBoard>
        <StrictModeDroppable key={'todo'} type="COLUMN" droppableId='todo' direction='horizontal'>
          { provided => (
            <Columns {...provided.droppableProps} ref={provided.innerRef}>
              <Draggable key={something[0].id} draggableId={something[0].id} index={0}>
                {(provided, snapshot) => (
                  <Ticket ref={provided.innerRef} {...provided.draggableProps} isDragging={snapshot.isDragging} {...provided.dragHandleProps}>
                    <div isDragging={snapshot.isDragging} {...provided.dragHandleProps}>you were the chosen one!</div>
                  </Ticket>
                )}
              </Draggable>
              {provided.placeholder}
            </Columns>
          )}
        </StrictModeDroppable>
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