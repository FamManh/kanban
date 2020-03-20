import React from "react";
import { Button, Form, Input, Row } from "antd";
import { Eye, Mail, Triangle } from "react-feather";
import { Link, Route, Redirect, Router } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import actions from "./actions";
import selectors from "./selectors";
import { isAuthenticated } from "../utils/auth";
import Text from "antd/lib/typography/Text";

const FormItem = Form.Item;

const Content = styled.div`
    max-width: 400px;
    z-index: 2;
    min-width: 300px;
`;

const Signin = () => {
    const dispatch = useDispatch();
    const loading = useSelector(selectors.selectSigninLoading);
    const error = useSelector(selectors.selectSigninErrorMessage);
    const onFinish = async values => {
        dispatch(actions.doSignin(values));
    };
    return (
        <Row
            type="flex"
            align="middle"
            justify="center"
            className="px-3 bg-white mh-page"
            style={{ minHeight: "100vh" }}
        >
            <Content>
                <div className="text-center mb-5">
                    <Link to="/signin" className="brand mr-0">
                        <Triangle size={32} strokeWidth={1} />
                    </Link>
                    <h5 className="mb-0 mt-3">Sign in</h5>

                    <p className="text-muted">get started with our service</p>
                </div>

                {!!error && <Text type="danger">{error}</Text>}

                <Form layout="vertical" onFinish={onFinish}>
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

                    <FormItem>
                        <Link to="/forgot" className="text-xs-right">
                            <small>Forgot password</small>
                        </Link>
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            className="mt-3"
                            loading={loading}
                        >
                            Log in
                        </Button>
                    </FormItem>

                    <div className="text-center">
                        <small className="text-muted">
                            <span>Don't have an account yet?</span>{" "}
                            <Link to="/signup">&nbsp;Create one now!</Link>
                        </small>
                    </div>
                </Form>
            </Content>
        </Row>
    );
};

export default Signin;
