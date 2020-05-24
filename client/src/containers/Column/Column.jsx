import React from "react";
import { Inner, Wrapper } from "../BoardPage/styles/Taskboard";

import { Draggable } from "react-beautiful-dnd";
import PropTypes from "prop-types";
import TaskList from "./TaskList";
import { PlusOutlined } from "@ant-design/icons";

const Column = ({ title, tasks, index }) => (
    <Draggable draggableId={title} index={index}>
        {provided => (
            <Wrapper
                key={index}
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={{
                    ...provided.draggableProps.style
                }}
            >
                <Inner>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center"
                        }}
                    >
                        <h5 className="mx-2 mt-2 text-capitalize">{title}</h5>
                        <div>
                            <PlusOutlined />
                        </div>
                    </div>
                    <div
                        style={{width: '400px'}}
                        className="p-1 scroll-y"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                    >
                        <TaskList listId={title} tasks={tasks} />
                    </div>
                </Inner>
            </Wrapper>
        )}
    </Draggable>
);

Column.propTypes = {
    title: PropTypes.string,
    index: PropTypes.number,
    tasks: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string,
            description: PropTypes.string,
            color: PropTypes.oneOf([
                "primary",
                "success",
                "error",
                "info",
                "normal",
                "warning"
            ]),
            tags: PropTypes.array,
            images: PropTypes.array
        })
    ).isRequired
};

export default Column;
