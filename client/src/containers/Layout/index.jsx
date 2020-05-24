import { Layout as AntLayout } from "antd";
import React from "react";
import Header from "./Header";
import LayoutWrapper from "./styles/LayoutWrapper";
const { Content } = AntLayout;

const Layout = ({ children, match }) => {
    return (
        <LayoutWrapper>
                <Header />
                <Content>{children}</Content> 
        </LayoutWrapper>
    );
};

export default Layout;
