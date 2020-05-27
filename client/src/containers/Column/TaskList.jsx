import React from "react";

import { Draggable, Droppable } from 'react-beautiful-dnd';

import TaskItem from './TaskItem';

class InnerTaskList extends React.Component {
  shouldComponentUpdate(nextProps) {
    if (nextProps.tasks !== this.props.tasks) {
      return true;
    }
    return false;
  }

  render() {
    return this.props.tasks.map((task, index) => (
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
  }
}

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

class TaskList extends React.Component {
  static defaultProps = {
    listId: 'LIST'
  };
  render() {
    const {
      ignoreContainerClipping,
      isDropDisabled,
      listId,
      tasks,
      title
    } = this.props;

    return (
      <Droppable
        droppableId={listId}
        // ignoreContainerClipping={ignoreContainerClipping}
        // isDropDisabled={isDropDisabled}

      >
        {(dropProvided, dropSnapshot) => (
          <div style={{minHeight:"100px"}} ref={dropProvided.innerRef}>
        <InnerTaskList tasks={tasks} />
        {dropProvided.placeholder}
      </div>
          // <InnerList tasks={tasks} title={title} dropProvided={dropProvided} />
        )}
      </Droppable>
    );
  }
}

export default TaskList;
