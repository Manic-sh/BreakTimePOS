import React from "react";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";

import { Menu, Dropdown, Space } from "antd";
import { LoginOutlined, UserOutlined } from "@ant-design/icons";
import AuthService from "../helpers/auth-service";

import Logo from "../logo.png";

export default class MyNavbar extends React.Component {
  logOut() {
    AuthService.logout();
  }

  render() {
    const token = AuthService.userLoggedIn();
    let currentUser = null;
    if (token) {
      const decoded = jwt_decode(token);
      currentUser = decoded.username;
    }
    const menu = (
      <Menu>
        <Menu.Item key="1">
          <Link
            to={{
              pathname: `/homepage`,
            }}
          >
            Home Page
          </Link>
        </Menu.Item>
        <Menu.Item key="4">
          <Link
            to={{
              pathname: `/reports/`,
            }}
          >
            Reports
          </Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link
            to={{
              pathname: `/products/`,
            }}
          >
            {" "}
            Products
          </Link>
        </Menu.Item>
        <Menu.Item key="3">
          <a href="/login" onClick={this.logOut}>
            {" "}
            Logout{" "}
          </a>
        </Menu.Item>
      </Menu>
    );

    return (
      <div className="menu">
        <img src={Logo} alt="BreakTime" />
        {currentUser ? (
          <div className="user-account">
            <Space wrap></Space>
            <Dropdown.Button
              overlay={menu}
              placement="bottomCenter"
              icon={<UserOutlined />}
            >
              {currentUser}
            </Dropdown.Button>
          </div>
        ) : (
          <>
            <a href="/login">
              Login &nbsp; <LoginOutlined />{" "}
            </a>
            <a href="/">Home</a>
          </>
        )}
      </div>
    );
  }
}
