import React from "react";
import { connect } from "react-redux";
import { Route, Redirect, Switch } from "react-router-dom";
import { Auth, Home, Chat, Search,Settings } from "pages";
import { Header } from "components";
import { Layout } from "antd";
import { ProfileContainer } from "containers";

const { Content } = Layout;

const App = props => {
  const { isAuth } = props;
  return (
    <Layout style={{height:"100%"}}>
          <Header />
        <Content className="wrapper">
          <Switch>
            <Route exact path={["/signin", "/signup", "/signup/verify", "/addinfo"]} component={Auth} />
            <Route path="/chat" render={() => (isAuth ? <Chat /> : <Redirect to="/signin" />)} />
            <Route path="/search" render={() => (isAuth ? <Search /> : <Redirect to="/signin" />)} />
            <Route path="/profile" render={() => (isAuth ? <ProfileContainer /> : <Redirect to="/signin" />)} />
            <Route exact path="/" render={() => (isAuth ? <Home /> : <Redirect to="/signin" />)} />
            <Route exact path="/settings" render={() => (isAuth ? <Settings /> : <Redirect to="/signin" />)} />
          </Switch>
        </Content>
    </Layout>
  );
};

export default connect(({ user }) => ({ isAuth: user.isAuth }))(App);
