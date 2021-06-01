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
import AuthService from './helpers/auth-service';

const { Content } = Layout;

class App extends React.Component {
  
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
               {AuthService.userLoggedIn() &&  (
                 <>
                              <Route  exact path="/order/:id/" component={Order} />
                              <Route  exact path="/reports/" component={Report} />
                              <Route  exact path="/homepage/" component={Homepage} />
                              <Route  exact path="/products/" component={Product} />
                              <Route  exact path="/profile/" component={Profile} />
                </>
               )}
               <Route exact path={["/", "/landing"]} component={Landing} />
               <Route  exact path="/login" component={Login} />  
            </Switch>
          </Content>
        </Layout>
      </BrowserRouter>
    )
  }
}
export default App;
