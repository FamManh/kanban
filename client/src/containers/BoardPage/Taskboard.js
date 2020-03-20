import React,{ useState } from 'react'
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import reorder, { reorderQuoteMap } from "./taskboard/reorder";
import Column from "./taskboard/Column";
import MockTaskboard from "./mock";
import styled from "styled-components";
import { UserOutlined, DownOutlined, PlusOutlined } from "@ant-design/icons";
import { Avatar, Button, Dropdown, Menu } from 'antd';
import Text from 'antd/lib/typography/Text';

const TitleWrapper = styled.div`
    height: 48px;
    lineheight: "48px";
    display: flex;
    justify-content: space-between;
    padding: 0px 15px;
    
`;

const Taskboard = () => {
    const [columns, setColumn] = useState(MockTaskboard);
    const [ordered, setOrder] = useState(Object.keys(columns));

    const onDragEnd = result => {
        if (!result.destination) return;

        const source = result.source;
        const destination = result.destination;

        if (
            source.droppableId === destination.droppableId &&
            source.index === destination.index
        ) {
            return;
        }

        if (result.type === "COLUMN") {
            const ordered = reorder(ordered, source.index, destination.index);

            setOrder(ordered);

            return;
        }

        const data = reorderQuoteMap({
            quoteMap: columns,
            source,
            destination
        });

        setColumn(data.quoteMap);
    };

    const menu = (
        <Menu style={{minWidth: "200px"}}>
            <Menu.Item key="0">
                <a href="#">Kanban Project</a>
            </Menu.Item>
            <Menu.Item key="1">
                <a href="#">Awesome Chat Project</a>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="3">Create new board</Menu.Item>
        </Menu>
    );

    return (
        <div style={{ backgroundColor: "#f6f8fc" }}>
            <TitleWrapper>
                <div style={{ lineHeight: "48px" }}>
                    <Text style={{ color: "#73737c", fontSize: "22px" }}>
                        Dash name
                    </Text>
                    <Dropdown overlay={menu} trigger={["click"]}>
                        <Button
                            style={{ marginLeft: "5px" }}
                            shape="circle"
                            icon={<DownOutlined />}
                            size="small"
                        />
                    </Dropdown>
                </div>
                <div style={{ lineHeight: "48px" }}>
                    <Avatar
                        style={{ margin: "0 2px" }}
                        icon={<UserOutlined />}
                    />
                    <Avatar style={{ margin: "0 2px" }}>U</Avatar>
                    <Avatar style={{ margin: "0 2px" }}>U</Avatar>
                    <Avatar style={{ margin: "0 2px" }}>U</Avatar>
                    <Button
                        style={{ marginLeft: "2px" }}
                        shape="circle"
                        icon={<PlusOutlined />}
                    />
                </div>
            </TitleWrapper>

            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="taskboard" type="COLUMN">
                    {provided => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            // className="full-workspace scroll-x text-nowrap px-2"
                            className="full-workspace scroll-x text-nowrap px-2"
                        >
                            {ordered.map((key, index) => (
                                <Column
                                    key={key}
                                    index={index}
                                    title={key}
                                    tasks={columns[key]}
                                />
                            ))}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
};

export default Taskboard;
