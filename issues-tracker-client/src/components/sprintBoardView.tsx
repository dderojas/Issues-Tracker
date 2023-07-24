import { useState } from 'react';
import { SprintBoard, Columns, Ticket } from '../styles'
import { CSS } from "@dnd-kit/utilities";
import { DndContext, closestCenter } from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable
} from "@dnd-kit/sortable";

const SortableItem = (props: any) => {
  // props.id
  // JavaScript

  const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition
  } = useSortable({id: props.id});

  const style = {
      transform: CSS.Transform.toString(transform),
      transition
  }

  return (
      <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
          <Ticket>{props.id}</Ticket>
      </div>
  )
}


const SprintBoardView = (props:any) => {
  const [languages, setLanguages ] = useState(["JavaScript", "Python", "TypeScript"]);

  const handleDragEnd = (event:any) => {
    console.log("Drag end called");
    const {active, over} = event;
    console.log("ACTIVE: " + active.id);
    console.log("OVER :" + over.id);

    if(active.id !== over.id) {
      setLanguages((items) => {
        const activeIndex = items.indexOf(active.id);
        const overIndex = items.indexOf(over.id);
        console.log(arrayMove(items, activeIndex, overIndex));
        return arrayMove(items, activeIndex, overIndex);
        // items: [2, 3, 1]   0  -> 2
        // [1, 2, 3] oldIndex: 0 newIndex: 2  -> [2, 3, 1] 
      });
      
    }
  }

  return (
      <SprintBoard>
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <Columns>
            <SortableContext
              items={languages}
              strategy={verticalListSortingStrategy}
            >
              {/* We need components that use the useSortable hook */}
              {languages.map(language => <SortableItem key={language} id={language}/>)}
            </SortableContext>
          </Columns>
        </DndContext>
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <Columns>
            <SortableContext
              items={languages}
              strategy={verticalListSortingStrategy}
            >
              {/* We need components that use the useSortable hook */}
              {languages.map(language => <SortableItem key={language} id={language}/>)}
            </SortableContext>
          </Columns>
        </DndContext>
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <Columns>
            <SortableContext
              items={languages}
              strategy={verticalListSortingStrategy}
            >
              {/* We need components that use the useSortable hook */}
              {languages.map(language => <SortableItem key={language} id={language}/>)}
            </SortableContext>
          </Columns>
        </DndContext>
      </SprintBoard>
    // <SprintBoard>
  //     {/* <Columns>
  //       {props.sprintBoardState.todo?.map((elem:any) => {
  //         return (
  //           <Ticket onClick={() => {
  //             props.openModalWithData(elem.Assignee, elem.Description, elem.PriorityLevel, elem.TicketStatus, elem.IssueType, elem.TicketId)
  //           }}>
  //             <div>{elem.Assignee}</div>
  //             <div>{elem.Description}</div>
  //             <div>{elem.PriorityLevel}</div>
  //             <div>{elem.IssueType}</div>
  //             <div>{elem.TicketStatus}</div>
  //           </Ticket>
  //         )
  //       })}
  //     </Columns>
  //     <Columns>
  //       {props.sprintBoardState.inProgress?.map((elem:any) => {
  //         return (
  //           <Ticket onClick={() => {
  //             props.openModalWithData(elem.Assignee, elem.Description, elem.PriorityLevel, elem.TicketStatus, elem.IssueType, elem.TicketId)
  //           }}>
  //             <div>{elem.Assignee}</div>
  //             <div>{elem.Description}</div>
  //             <div>{elem.PriorityLevel}</div>
  //             <div>{elem.IssueType}</div>
  //             <div>{elem.TicketStatus}</div>
  //           </Ticket>
  //         )
  //       })}
  //     </Columns>
  //     <Columns>
  //       {props.sprintBoardState.done?.map((elem:any) => {
  //         return (
  //           <Ticket onClick={() => {
  //             props.openModalWithData(elem.Assignee, elem.Description, elem.PriorityLevel, elem.TicketStatus, elem.IssueType, elem.TicketId)
  //           }}>
  //             <div>{elem.Assignee}</div>
  //             <div>{elem.Description}</div>
  //             <div>{elem.PriorityLevel}</div>
  //             <div>{elem.IssueType}</div>
  //             <div>{elem.TicketStatus}</div>
  //           </Ticket>
  //         )
  //       })}
  //     </Columns> */}
  //   {/* </SprintBoard> */}
  )
}

export {
  SprintBoardView
}