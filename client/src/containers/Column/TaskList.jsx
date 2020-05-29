import React, { useEffect } from "react";

import { Draggable, Droppable } from 'react-beautiful-dnd';

import TaskItem from './TaskItem';

const InnerTaskList = ({ tasks }) => {
    return tasks.map((task, index) => (
        <Draggable key={task.shortid} draggableId={task.shortid} index={index}>
            {(dragProvided, dragSnapshot) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    isDragging={dragSnapshot.isDragging}
                    provided={dragProvided}
                />
            )}
        </Draggable>
    ));
};

class InnerList extends React.Component {
  render() {
    const { tasks, dropProvided } = this.props;
    return (
      <div ref={dropProvided.innerRef}>
        <InnerTaskList tasks={tasks} />
        {dropProvided.placeholder}
      </div>
    );
  }
}

const TaskInfo = ({match})=>{
  return(
  <div>Hello {match}</div>
  )
}

const TaskList = ({ tasks, listId }) => {
    return (
        <Droppable 
            droppableId={listId}
            // ignoreContainerClipping={ignoreContainerClipping}
            // isDropDisabled={isDropDisabled}
        >
            {(dropProvided, dropSnapshot) => (
                <div style={{ minHeight: "100px" }} ref={dropProvided.innerRef}>
                    <InnerTaskList tasks={tasks} />
                    {dropProvided.placeholder}
                </div>
                // <InnerList tasks={tasks} title={title} dropProvided={dropProvided} />
            )}
        </Droppable>
    );
};

export default TaskList;
