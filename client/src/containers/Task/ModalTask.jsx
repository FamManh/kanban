import React from 'react'
import {Modal} from 'antd';
import actions from './actions'
import selectors from './selectors'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import styled from 'styled-components'
import ToggleInput from '../../components/ToggleInput';

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
    }
`;

function ModalTask() {
    const dispath = useDispatch();
    const taskId = useSelector(selectors.selectTaskId);
    let task = useSelector(selectors.selectTask);
    const onCancel = ()=> dispath(actions.doSelectTask(null))

    const onBlurTitleInput = (value)=>{
        dispath(actions.doUpdate({ title: value }, taskId));
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
                    </div>
                    {task?.description}
                </div>
            </TaskWrapper>
        </Modal>
    );
}

export default ModalTask
