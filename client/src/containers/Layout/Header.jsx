import { Layout, Menu, Dropdown, Avatar } from 'antd';
import {LogoutOutlined, UserOutlined} from "@ant-design/icons";
import React from 'react';
import authActions from '../AuthPage/actions';
import HeaderWrapper from './styles/HeaderWrapper';
const { Header: AntHeader } = Layout;


const Header = () => {
  let doSignout = () => {
    authActions.doSignout()
  };

  let doNavigateToProfile = () => {
    // getHistory().push('/profile');
  };

  let doToggleMenu = () => {
    // dispatch(actions.doToggleMenu());
  };

  let userMenu = (
      <Menu selectedKeys={[]}>
          <Menu.Item onClick={doNavigateToProfile} key="userCenter">
              <UserOutlined />
              Thông tin cá nhân
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item onClick={doSignout} key="logout">
              <LogoutOutlined />
              Thoát
          </Menu.Item>
      </Menu>
  );


    return (
        <HeaderWrapper>
            <AntHeader style={{ height: "48px", lineHeight: "48px" }}>
                <div>
                </div>
                <div>
                    <Dropdown className="user-dropdown" overlay={userMenu}>
                        <span>
                            <Avatar
                                className="user-dropdown-avatar"
                                size="small"
                                src={undefined}
                                alt="avatar"
                                style={{ margin: "12px 8px 12px 0" }}
                            />
                            <span className="user-dropdown-text">Manh</span>
                        </span>
                    </Dropdown>
                </div>
            </AntHeader>
        </HeaderWrapper>
    );
  
}

export default Header;
