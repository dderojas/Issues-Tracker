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

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  console.log(result, 'result??')
  const [removed] = result.splice(startIndex, 1);
  console.log(removed, 'removed??')
  result.splice(endIndex, 0, removed);
  console.log(result, 'result after splice??')

  return result;
};

const starWarsMap = {
  anakin: [{ id: '1a', content: 'I hate you!' }, {id: '1b', content: 'anakin!!'}],
  obiwan: [{ id: '2a', content: 'you were the chosen one!' }, {id: '2b', content: 'obiwan!!'}],
  yoda: [{ id: '3a', content: 'hello there' }, {id: '3b', content: 'yoda!!'}],
}

const SprintBoardView = (props:any) => {
  const [columns, setColumns] = useState(starWarsMap)
  const [ordered, setOrdered] = useState(Object.keys(starWarsMap))

  const handleOnDragEnd = (result: any) => {
    console.log('in dragend!!!')

    if (result.combine) {
      console.log('in combine??')
      if (result.type === "COLUMN") {
        const shallow = [...ordered];
        shallow.splice(result.source.index, 1);
        setOrdered(shallow);
        return;
      }

      const column = columns[result.source.droppableId];
      const withQuoteRemoved = [...column];

      withQuoteRemoved.splice(result.source.index, 1);

      const orderedColumns = {
        ...columns,
        [result.source.droppableId]: withQuoteRemoved
      };
      setColumns(orderedColumns);
      return;
    }

    // dropped nowhere
    if (!result.destination) {
      console.log(result, 'in nowhere??')
      return;
    }

    const source = result.source;
    const destination = result.destination;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }
    console.log(result, 'before reorder!')
    // reordering column
    if (result.type === "COLUMN") {
      const reorderedorder = reorder(ordered, source.index, destination.index);
      console.log(reorderedorder, 'reorderedorder??')
      setOrdered(reorderedorder);

      return;
    }

    const data = reorderQuoteMap({
      quoteMap: columns,
      source,
      destination
    });

    setColumns(data.quoteMap);
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <SprintBoard>
        <StrictModeDroppable type="COLUMN" droppableId='todo' direction='horizontal'>
          { provided => (
            <Columns {...provided.droppableProps} ref={provided.innerRef}>
              <Draggable key={columns[ordered[0]][0].id} draggableId={columns[ordered[0]][0].id} index={0}>
                {(provided, snapshot) => (
                  <Ticket ref={provided.innerRef} {...provided.draggableProps} isDragging={snapshot.isDragging} {...provided.dragHandleProps}>
                    <div isdragging={snapshot.isDragging.toString()} {...provided.dragHandleProps}>{columns[ordered[0]][0].content}</div>
                  </Ticket>
                )}
              </Draggable>
              <Draggable key={columns[ordered[0]][1].id} draggableId={columns[ordered[0]][1].id} index={0}>
                {(provided, snapshot) => (
                  <Ticket ref={provided.innerRef} {...provided.draggableProps} isDragging={snapshot.isDragging} {...provided.dragHandleProps}>
                    <div isdragging={snapshot.isDragging.toString()} {...provided.dragHandleProps}>{columns[ordered[0]][1].content}</div>
                  </Ticket>
                )}
              </Draggable>
              {provided.placeholder}
            </Columns>
          )}
        </StrictModeDroppable>
        <StrictModeDroppable type="COLUMN" droppableId='inProgress' direction='horizontal'>
          { provided => (
            <Columns {...provided.droppableProps} ref={provided.innerRef}>
              <Draggable key={columns[ordered[1]][0].id} draggableId={columns[ordered[1]][0].id} index={1}>
                {(provided, snapshot) => (
                  <Ticket ref={provided.innerRef} {...provided.draggableProps} isDragging={snapshot.isDragging} {...provided.dragHandleProps}>
                    <div isdragging={snapshot.isDragging.toString()} {...provided.dragHandleProps}>{columns[ordered[1]][0].content}</div>
                  </Ticket>
                )}
              </Draggable>
              <Draggable key={columns[ordered[1]][1].id} draggableId={columns[ordered[1]][1].id} index={1}>
                {(provided, snapshot) => (
                  <Ticket ref={provided.innerRef} {...provided.draggableProps} isDragging={snapshot.isDragging} {...provided.dragHandleProps}>
                    <div isdragging={snapshot.isDragging.toString()} {...provided.dragHandleProps}>{columns[ordered[1]][1].content}</div>
                  </Ticket>
                )}
              </Draggable>
              {provided.placeholder}
            </Columns>
          )}
        </StrictModeDroppable>
        <StrictModeDroppable type="COLUMN" droppableId='done' direction='horizontal'>
          { provided => (
            <Columns {...provided.droppableProps} ref={provided.innerRef}>
              <Draggable key={columns[ordered[2]][0].id} draggableId={columns[ordered[2]][0].id} index={2}>
                {(provided, snapshot) => (
                  <Ticket ref={provided.innerRef} {...provided.draggableProps} isDragging={snapshot.isDragging} {...provided.dragHandleProps}>
                    <div isdragging={snapshot.isDragging.toString()} {...provided.dragHandleProps}>{columns[ordered[2]][0].content}</div>
                  </Ticket>
                )}
              </Draggable>
              <Draggable key={columns[ordered[2]][1].id} draggableId={columns[ordered[2]][1].id} index={2}>
                {(provided, snapshot) => (
                  <Ticket ref={provided.innerRef} {...provided.draggableProps} isDragging={snapshot.isDragging} {...provided.dragHandleProps}>
                    <div isdragging={snapshot.isDragging.toString()} {...provided.dragHandleProps}>{columns[ordered[2]][1].content}</div>
                  </Ticket>
                )}
              </Draggable>
              {provided.placeholder}
            </Columns>
          )}
        </StrictModeDroppable>
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