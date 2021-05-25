import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Homepage from './views/Homepage.js';
import Order from './views/Order.js';
import Report from './views/Reports.js';
import Product from './views/Products.js';
import Landing from "./views/Landing.js";
import Login from "./views/LoginPage.js";
import Profile from "./views/Profile.js";

import { Layout } from 'antd';
import './App.css';
import MyNavBar from './components/Navbar.js';
import AuthService from "./helpers/axios-services/auth-service";


const { Footer, Content } = Layout;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: AuthService.getCurrentUser()
    };
  }
  
  render() {
    return (
      <BrowserRouter>
        <MyNavBar />
        <Layout>
          <Content
            className="site-layout-background"
            style={{
              padding: 0,
              margin: 0,
              minHeight: 280,
            }}
          >
            <Switch key='01'>
              <Route exact path={["/", "/landing"]} component={Landing} />
              <Route key="001" exact path="/login" component={Login} />
              <Route key='002' exact path="/order/:id/" component={Order} />
              <Route key='003' exact path="/reports/" component={Report} />
              <Route key='004' exact path="/homepage/" component={Homepage} />
              <Route key='005' exact path="/products/" component={Product} />
              <Route key='006' exact path="/profile/" component={Profile} />
            </Switch>
          </Content>
        </Layout>
        <Footer className="footer">BreakTime ©2021 Created by Rightpass.tech</Footer>
      </BrowserRouter>
    )
  }
}

export default App;
