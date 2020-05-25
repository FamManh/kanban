import React, {useState} from "react";
import { Inner, Wrapper } from "../BoardPage/styles/Taskboard";

import { Draggable } from "react-beautiful-dnd";
import PropTypes from "prop-types";
import TaskList from "./TaskList";
import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import FormComp from "./form/FormComp";

const Column = ({ tasks, index, info }) => {

    const [formCompVisible, setFormCompVisible] = useState(false)

    return (
        <Wrapper
            key={index}
            // style={{
            //     ...provided.draggableProps.style
            // }}
        >
            <FormComp
                visible={formCompVisible}
                toggle={() => setFormCompVisible(!formCompVisible)}
                columnId={info.id}
            />
            <Inner>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <h5 className="mx-2 mt-2 text-capitalize">{info.name}</h5>
                    <div>
                        <Button
                            shape="circle"
                            icon={<PlusOutlined />}
                            onClick={() => setFormCompVisible(!formCompVisible)}
                        ></Button>
                    </div>
                </div>
                <div
                    // style={{ width: "400px" }}
                    className="p-1 scroll-y"
                    // ref={provided.innerRef}
                    // {...provided.draggableProps}
                >
                    <TaskList listId={info.id} tasks={info.tasks} />
                </div>
            </Inner>
        </Wrapper>
    );
};

// Column.propTypes = {
//     index: PropTypes.number,
//     info: PropTypes
//     tasks: PropTypes.arrayOf(
//         PropTypes.shape({
//             title: PropTypes.string,
//             description: PropTypes.string,
//             color: PropTypes.oneOf([
//                 "primary",
//                 "success",
//                 "error",
//                 "info",
//                 "normal",
//                 "warning"
//             ]),
//             tags: PropTypes.array,
//             images: PropTypes.array
//         })
//     ).isRequired
// };

export default Column;
