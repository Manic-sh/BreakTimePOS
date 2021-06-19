import React, { Component } from "react";

import { Row, Col, Card, Form, Input, Button, Avatar, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import AuthService from "../helpers/auth-service";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.onFinish = this.onFinish.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      password: "",
      loading: false,
      message: "error",
    };
  }
  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }
  onFinish = (values) => {
    this.setState({
      message: "success",
      loading: true,
    });
    AuthService.login(values.username, values.password).then(
      () => {
        this.props.history.push("/homepage");
        window.location.reload();
      },
      (error) => {
        message.info("Incorrect Username or Password!!!");
      }
    );
  };

  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  render() {
    return (
      <div className="login-container">
        <Row>
          <Col>
            <Card className="login-form-card">
              <Avatar size={100} icon={<UserOutlined />} />
              <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={this.onFinish}
              >
                <Form.Item
                  name="username"
                  hasFeedback
                  validateStatus={this.message}
                  rules={[
                    { required: true, message: "Please enter Username!" },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Username"
                    onChange={this.onChangeUsername}
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  hasFeedback
                  validateStatus={this.message}
                  rules={[
                    { required: true, message: "Please enter Password!" },
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    placeholder="Password"
                    onChange={this.onChangePassword}
                  />
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                    block
                  >
                    Log In
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
