import React from "react";
import { connect } from "react-redux";
import { Route, Redirect, Switch } from "react-router-dom";
import { Auth, Home, Chat } from "pages";
import { Header } from "components";
import { Layout } from "antd";
import ProfileContainer from "./containers/ProfileContainer";
import AddInfoForm from "./modules/AddInfoForm/components/AddInfoForm";

const { Content } = Layout;

const App = props => {
  const { isAuth } = props;
  return (
    <Layout style={{height:"100%"}}>
          <Header isAuth={isAuth}/>
        <Content className="wrapper">
          <Switch>
            <Route exact path={["/signin", "/signup", "/signup/verify", "/addinfo"]} component={Auth} />
            <Route path="/chat" render={() => (isAuth ? <Chat /> : <Redirect to="/signin" />)} />
            <Route path="/home" render={() => (isAuth ? <Home /> : <Redirect to="/signin" />)} />
            <Route path="/profile" render={() => (isAuth ? <ProfileContainer /> : <Redirect to="/signin" />)} />
            <Route path="/addInfo" render={() => (isAuth ? <AddInfoForm /> : <Redirect to="/signin" />)} />
          </Switch>
        </Content>
    </Layout>
  );
};

export default connect(({ user }) => ({ isAuth: user.isAuth }))(App);
