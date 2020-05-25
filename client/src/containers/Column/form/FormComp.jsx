import React from "react";
import {useDispatch, useSelector} from 'react-redux'
import actions from '../actions'
import selectors from "../selectors"
import { Button, Modal, Form, Input, Radio } from "antd";

function FormComp({ visible, toggle, columnId }) {
    const columns = useSelector(selectors.selectColumns)
    const dispatch = useDispatch();
    const onCreate = (values) => {
        const taskInfo = { ...values, columnId };
        taskInfo.sortOrder = 0;
        let currentColumn = columns.filter((item) => item.id === columnId)[0];

        if (currentColumn && currentColumn.tasks.length > 0) {
            taskInfo.sortOrder =
                currentColumn.tasks[currentColumn.tasks.length - 1].sortOrder +
                500;
        };
        dispatch(actions.doCreate(taskInfo));
        toggle();
    };

    const onCancel = () => {
        toggle();
    };
    const [form] = Form.useForm();
    return (
        <Modal
            visible={visible}
            title="Create a new collection"
            okText="Create"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
                form.validateFields()
                    .then((values) => {
                        form.resetFields();
                        onCreate(values);
                    })
                    .catch((info) => {
                        console.log("Validate Failed:", info);
                    });
            }}
        >
            <Form form={form} layout="vertical" name="form_in_modal">
                <Form.Item
                    name="title"
                    label="Title"
                    rules={[
                        {
                            required: true,
                            message: "Please input the title of collection!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item name="description" label="Description">
                    <Input type="textarea" />
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default FormComp;
