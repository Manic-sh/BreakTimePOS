import React, { Component } from "react";
import AuthService from "../helpers/auth-service.js";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: AuthService.getCurrentUser()
    };
  }

  render() {
    const { username } = localStorage.getItem('username');

    return (
      <div className="container">
        <header className="jumbotron">
          <h3>
            <strong>Welcome {username}</strong> <br />Profile
          </h3>
        </header>
      </div>
    );
  }
}
