import React,{ useState, useEffect } from 'react'
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import reorder, { reorderQuoteMap } from "../Column/reorder";
import Column from "../Column/Column";
import MockTaskboard from "./mock";
import styled from "styled-components";
import { UserOutlined, DownOutlined, PlusOutlined } from "@ant-design/icons";
import { Avatar, Button, Dropdown, Menu } from 'antd';
import {useParams} from 'react-router-dom'
import Text from 'antd/lib/typography/Text';
import { useDispatch, useSelector } from 'react-redux';
import actions from './actions'
import selectors from './selectors';
import columnSelectors from "../Column/selectors";
import columnActions from "../Column/actions";
 

const TitleWrapper = styled.div`
    height: 48px;
    lineheight: "48px";
    display: flex;
    justify-content: space-between;
    padding: 0px 15px;
`;

const ListsContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

const Taskboard = () => {
    const dispatch = useDispatch();
    let {id} = useParams();
    const columns = useSelector(columnSelectors.selectColumns);
    const board = useSelector(selectors.selectBoard)
    // const [columns, setColumn] = useState(MockTaskboard);
    // const [ordered, setOrder] = useState(Object.keys(columns));

 
    const onDragEnd = result => {
        const { source, destination } = result;
        // droped outside the list
         if (!destination) return;

        // cùng 1 cột cùng index 
        if (
            source.droppableId === destination.droppableId &&
            source.index === destination.index
        ) {
            return;
        }

        // if (result.type === "COLUMN") {
        //     // const ordered = reorder(ordered, source.index, destination.index);

        //     // setOrder(ordered);

        //     return;
        // }

        const data = reorderQuoteMap({
            quoteMap: columns,
            source,
            destination
        });

        dispatch(columnActions.doColumnReorder(data.quoteMap));
    };

    useEffect(() => {
        // call api
        dispatch(actions.doFind(id));
    }, [])

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
                        {board && board.name}
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
                <div
                    className="full-workspace scroll-x text-nowrap px-2"
                    // style={{ display: "flex", flexDirection: "row" }}
                >
                    {columns.map((item, index) => (
                        <Column
                            key={item.id}
                            index={index}
                            info={item}
                            tasks={[]}
                        />
                    ))}
                </div>
            </DragDropContext>
        </div>
    );
};

export default Taskboard;
