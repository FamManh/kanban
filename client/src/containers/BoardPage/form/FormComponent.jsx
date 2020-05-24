import React,{ useState } from "react";
import { Steps, Button, message, Input, Form, Modal } from "antd";
import {useSelector, useDispatch} from "react-redux";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import actions from '../actions'
const { Step } = Steps;

const steps = [
    {
        title: "General",
        content: "General settings"
    },
    {
        title: "Columns",
        content: "Columns"
    }
];

const layout = {
    labelCol: {
        span: 6
    },
    wrapperCol: {
        span: 12
    }
};

function FormComponent() {
    const dispatch = useDispatch();
    const [currentStep, setCurrentStep] = useState(0);
    const [boardName, setBoardName] = useState("");
    const [boardColumns, setBoardColumns] = useState([]);

    const onNext = () => {
        if (boardName.trim() === "") {
            Modal.warning({
                title: "Board name is required!"
            });
            return;
        }
        setCurrentStep(currentStep + 1);
    };

    const onPrev = () => setCurrentStep(currentStep - 1);

    const onDone = () => {
        if (!boardColumns.length) {
            Modal.warning({
                title: "At least 1 column"
            });
            return;
        }
        let isNameNull = false;
        boardColumns.forEach(item => {
            if (!item.name.trim()) {
                isNameNull = true;
            }
        });
        if (isNameNull) {
            Modal.warning({
                title: "Column name is required!"
            });
            return;
        }
        dispatch(actions.doCreate({name: boardName, columns: boardColumns}));
    };

    const renderButton = () => (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
                {currentStep > 0 && <Button onClick={onPrev}>Previous</Button>}
            </div>
            <div>
                {currentStep < steps.length - 1 && (
                    <Button htmlType="submit" type="primary" onClick={onNext}>
                        Next
                    </Button>
                )}
                {currentStep === steps.length - 1 && (
                    <Button
                        type="primary"
                        onClick={onDone}
                    >
                        Done
                    </Button>
                )}
            </div>
        </div>
    );

    const onFinish = values => {
        console.log("Success:", values);
    };

    const onFinishFailed = errorInfo => {
        console.log("Failed:", errorInfo);
    };

    const renderFirstStep = () => (
        <Form.Item label="Board name">
            <Input onChange={e => setBoardName(e.target.value)} />
        </Form.Item>
    );

    const formListChange = (index, value) => {
        let columns = boardColumns;
        columns[index] = { name: value };
        setBoardColumns(columns);
    };

    const renderSecondStep = () => (
        <Form.List name="names">
            {(fields, { add, remove }) => {
                return (
                    <div>
                        {fields.map((field, index) => (
                            <Form.Item required={false} key={field.key}>
                                <Form.Item
                                    key={field.key}
                                    {...field}
                                    validateTrigger={["onChange", "onBlur"]}
                                    noStyle
                                >
                                    <Input
                                        onChange={e => {
                                            formListChange(
                                                index,
                                                e.target.value
                                            );
                                        }}
                                        placeholder={`Column ${index + 1}`}
                                        style={{ width: "90%", marginRight: 8 }}
                                    />
                                </Form.Item>
                                {fields.length > 1 ? (
                                    <MinusCircleOutlined
                                        className="dynamic-delete-button"
                                        onClick={() => {
                                            const columns = boardColumns;
                                            columns.splice(index, 1);
                                            setBoardColumns(columns);
                                            remove(field.name);
                                        }}
                                    />
                                ) : null}
                            </Form.Item>
                        ))}
                        <Form.Item>
                            <Button
                                type="dashed"
                                onClick={() => {
                                    const columns = boardColumns;
                                    columns.push({ name: ""});
                                    setBoardColumns(columns);
                                    add();
                                }}
                                style={{ width: "60%" }}
                            >
                                <PlusOutlined /> Add column
                            </Button>
                        </Form.Item>
                    </div>
                );
            }}
        </Form.List>
    );
    const renderThirdStep = () => (
        <Form.Item label="Board name 2">
            <Input />
        </Form.Item>
    );
    return (
        <div
            style={{
                maxWidth: "700px",
                margin: "0px auto",
                padding: "20px 40px",
                backgroundColor: "#fff"
            }}
        >
            <Steps current={currentStep}>
                {steps.map(item => (
                    <Step key={item.title} title={item.title} />
                ))}
            </Steps>
            <div
                className="steps-content"
                style={{ minHeight: "400px", padding: "40px 0" }}
            >
                <Form
                    {...layout}
                    name="basic"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    {currentStep === 0
                        ? renderFirstStep()
                        : currentStep === 1
                        ? renderSecondStep()
                        : renderThirdStep()}
                </Form>
            </div>
            {renderButton()}
        </div>
    );
}

export default FormComponent;
