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
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const starWarsMap = {
  anakin: [{ id: '1a', content: 'I hate you!' }],
  obiwan: [{ id: '2a', content: 'you were the chosen one!' }],
  yoda: [{ id: '3a', content: 'hello there' }],
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
              <Draggable key={ordered[0]} draggableId={ordered[0]} index={0}>
                {(provided, snapshot) => (
                  <Ticket ref={provided.innerRef} {...provided.draggableProps} isDragging={snapshot.isDragging} {...provided.dragHandleProps}>
                    <div isdragging={snapshot.isDragging.toString()} {...provided.dragHandleProps}>{columns[ordered[0]][0].content}</div>
                  </Ticket>
                )}
              </Draggable>
              {provided.placeholder}
            </Columns>
          )}
        </StrictModeDroppable>
        <StrictModeDroppable type="COLUMN" droppableId='bagh' direction='horizontal'>
          { provided => (
            <Columns {...provided.droppableProps} ref={provided.innerRef}>
              <Draggable key={ordered[1]} draggableId={ordered[1]} index={1}>
                {(provided, snapshot) => (
                  <Ticket ref={provided.innerRef} {...provided.draggableProps} isDragging={snapshot.isDragging} {...provided.dragHandleProps}>
                    <div isdragging={snapshot.isDragging.toString()} {...provided.dragHandleProps}>{columns[ordered[1]][0].content}</div>
                  </Ticket>
                )}
              </Draggable>
              {provided.placeholder}
            </Columns>
          )}
        </StrictModeDroppable>
        <StrictModeDroppable type="COLUMN" droppableId='ugh' direction='horizontal'>
          { provided => (
            <Columns {...provided.droppableProps} ref={provided.innerRef}>
              <Draggable key={ordered[2]} draggableId={ordered[2]} index={2}>
                {(provided, snapshot) => (
                  <Ticket ref={provided.innerRef} {...provided.draggableProps} isDragging={snapshot.isDragging} {...provided.dragHandleProps}>
                    <div isdragging={snapshot.isDragging.toString()} {...provided.dragHandleProps}>{columns[ordered[2]][0].content}</div>
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