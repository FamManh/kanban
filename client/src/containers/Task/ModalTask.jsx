import React from 'react'
import { Modal, Button, Popover } from 'antd';
import { UserOutlined, TagOutlined, CheckSquareOutlined, ClockCircleOutlined, LinkOutlined, PictureOutlined } from '@ant-design/icons';
import actions from './actions'
import selectors from './selectors'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import styled from 'styled-components'
import ToggleInput from '../../components/ToggleInput';
import TextAreaInput from '../../components/ToggleTextArea';

const TaskWrapper = styled.div`
    padding: 10px 15px;
    .task-header {
        font-size: 18px;
        margin: 10px 0px;
        font-weight: bold;
    }
    .task-body {
        font-size: 14px;
        margin: 10px 0px 15px 0px;
        display: flex;
        justify-content: space-between;
    }
`;

function ModalTask() {
    const text = <span>Title</span>;
const content = (
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
);
    const dispath = useDispatch();
    const taskId = useSelector(selectors.selectTaskId);
    let task = useSelector(selectors.selectTask);
    const onCancel = ()=> dispath(actions.doSelectTask(null))

    const onBlurTitleInput = (value)=>{
        dispath(actions.doUpdate({ title: value }, taskId));
    }

    const onBlurDescriptionInput = (value)=>{
        dispath(actions.doUpdate({ description: value }, taskId));
    }

    useEffect(()=>{
        dispath(actions.doFind(taskId));
    }, [])

    return (
        <Modal
            visible={true}
            okText="Create"
            cancelText="Cancel"
            maskClosable={false}
            onOk={() => {
                console.log("hdhsfsdf");
            }}
            onCancel={onCancel}
            footer={false}
        >
            <TaskWrapper>
                <div className="task-header">
                    <ToggleInput
                        value={task?.title}
                        onBlur={onBlurTitleInput}
                    />
                </div>
                <div className="task-body">
                    <div>
                        <strong>Mô tả</strong>
                        <TextAreaInput
                            value={task?.description}
                            onBlur={onBlurDescriptionInput}
                        />
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <p><strong>Thêm vào thẻ</strong></p>
                        <Popover
                            placement="bottom"
                            title={text}
                            content={content}
                            trigger="click"
                        >
                            <Button><UserOutlined />Thành viên</Button>
                        </Popover>
                        <Popover
                            placement="bottom"
                            title={text}
                            content={content}
                            trigger="click"
                        >
                            <Button><TagOutlined />Nhãn</Button>
                        </Popover>
                        <Popover
                            placement="bottom"
                            title={text}
                            content={content}
                            trigger="click"
                        >
                            <Button><CheckSquareOutlined />Việc cần làm</Button>
                        </Popover>
                        <Popover
                            placement="bottom"
                            title={text}
                            content={content}
                            trigger="click"
                        >
                            <Button><ClockCircleOutlined />Ngày hết hạn</Button>
                        </Popover>
                        <Popover
                            placement="bottom"
                            title={text}
                            content={content}
                            trigger="click"
                        >
                            <Button><LinkOutlined />Đính kèm</Button>
                        </Popover>
                        <Popover
                            placement="bottom"
                            title={text}
                            content={content}
                            trigger="click"
                        >
                            <Button><PictureOutlined />Ảnh bìa</Button>
                        </Popover>
                    </div>
                </div>
            </TaskWrapper>
        </Modal>
    );
}

export default ModalTask
