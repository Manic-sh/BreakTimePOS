import React from 'react';
import { Link } from 'react-router-dom';

import { Menu, Dropdown, Space } from 'antd';
import { LoginOutlined, UserOutlined } from '@ant-design/icons';
import AuthService from "../helpers/axios-services/auth-service";

import Logo from '../logo.png';

export default class MyNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    if (user) {
      this.setState({
        currentUser: user,
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser } = this.state;
    const menu = (
      <Menu>
        <Menu.Item key="1">
          <Link to={{
            pathname: `/homepage`
          }}>Home Page
                </Link>
        </Menu.Item>
        <Menu.Item key="4">
          <Link to={{
                  pathname: `/reports/`
                }}>Reports
                </Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to={{
            pathname: `/products/`
          }}> Products
                </Link>
        </Menu.Item>
        <Menu.Item key="3">
          <a href="/login" onClick={this.logOut}> Logout </a>
        </Menu.Item>
      </Menu>
    );

    return (
      <div className="menu">
        <img src={Logo} alt="BreakTime" />
        {currentUser ? (
          <div className="user-account">
            <Space wrap>
              <Dropdown.Button overlay={menu} placement="bottomCenter" icon={<UserOutlined />}>
                {localStorage.getItem('username')}
              </Dropdown.Button>
            </Space>
          </div>
        ) : (
          <a href="/login">Login &nbsp; <LoginOutlined /> </a>
        )}
      </div>

    );
  }
}
