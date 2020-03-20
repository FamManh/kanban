import React, {useState} from "react";
import { Button, Form, Input, Row, Tooltip } from "antd";
import { Eye, Mail, Triangle, User } from "react-feather";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import actions from './actions'
import selectors from './selectors'
import {Link} from 'react-router-dom'
import Text from "antd/lib/typography/Text";
const FormItem = Form.Item;

const Content = styled.div`
    max-width: 400px;
    z-index: 2;
    min-width: 300px;
`;

const Signup = () => {
    const dispatch = useDispatch();
    const loading = useSelector(selectors.selectSignupLoading);
    const error = useSelector(selectors.selectSignupErrorMessage);

    const onFinish = async values => {
        dispatch(actions.doSignup(values));
        
    };

    const onFinishFailed = ({ values, errorFields, outOfDate }) => {};
    return (
        <Row
            type="flex"
            align="middle"
            justify="center"
            className="px-3 bg-white"
            style={{ minHeight: "100vh" }}
        >
            <Content>
                <div className="text-center mb-5">
                    <Link to="/signup" className="brand mr-0">
                        <Triangle size={32} strokeWidth={1} />
                    </Link>
                    <h5 className="mb-0 mt-3">Sign up</h5>

                    <p className="text-muted">create a new account</p>
                </div>
                {!!error && <Text type="danger">{error}</Text>}

                <Form
                    layout="vertical"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <FormItem
                        label={<span>Full name&nbsp;</span>}
                        name="fullName"
                        rules={[
                            {
                                required: true,
                                message: "Please input your fullName!"
                            }
                        ]}
                        hasFeedback
                    >
                        <Input
                            prefix={
                                <User
                                    size={16}
                                    strokeWidth={1}
                                    style={{ color: "rgba(0,0,0,.25)" }}
                                />
                            }
                            placeholder="Full name"
                        />
                    </FormItem>

                    <FormItem
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: "Please input your email!"
                            },
                            { type: "email" }
                        ]}
                        hasFeedback
                    >
                        <Input
                            prefix={
                                <Mail
                                    size={16}
                                    strokeWidth={1}
                                    style={{ color: "rgba(0,0,0,.25)" }}
                                />
                            }
                            type="email"
                            placeholder="Email"
                        />
                    </FormItem>

                    <FormItem
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Please input your password!"
                            }
                        ]}
                        hasFeedback
                    >
                        <Input
                            prefix={
                                <Eye
                                    size={16}
                                    strokeWidth={1}
                                    style={{ color: "rgba(0,0,0,.25)" }}
                                />
                            }
                            type="password"
                            placeholder="Password"
                        />
                    </FormItem>

                    <FormItem
                        label="Confirm password"
                        name="confirmPassword"
                        dependencies={["password"]}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: "Please confirm your password!"
                            },
                            ({ getFieldValue }) => ({
                                validator(rule, value) {
                                    if (
                                        !value ||
                                        getFieldValue("password") === value
                                    ) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(
                                        "The two passwords that you entered do not match!"
                                    );
                                }
                            })
                        ]}
                    >
                        <Input
                            prefix={
                                <Eye
                                    size={16}
                                    strokeWidth={1}
                                    style={{ color: "rgba(0,0,0,.25)" }}
                                />
                            }
                            type="password"
                            placeholder="Confirm password"
                        />
                    </FormItem>

                    <FormItem>
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            loading={loading}
                        >
                            Sign up
                        </Button>
                    </FormItem>

                    <div className="text-center">
                        <small className="text-muted">
                            <span>Already have an account?</span>{" "}
                            <Link to="/signin">&nbsp;Login Now!</Link>
                        </small>
                    </div>
                </Form>
            </Content>
        </Row>
    );
};

export default Signup;
