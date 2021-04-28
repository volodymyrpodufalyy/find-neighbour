import React from "react";
import { connect } from "react-redux";
import { Route, Redirect, Switch } from "react-router-dom";
import { Auth, Home, Chat } from "pages";
import { Header } from "components";
import ProfileContainer from "./containers/ProfileContainer";

const App = props => {
  const { isAuth } = props;
  return (
    <div className="wrapper">
      <Header isAuth={isAuth}/>
      <Switch>
        <Route exact path={["/signin", "/signup", "/signup/verify"]} component={Auth} />
        <Route path="/chat" render={() => (isAuth ? <Chat /> : <Redirect to="/signin" />)} />
        <Route path="/home" render={() => (isAuth ? <Home /> : <Redirect to="/signin" />)} />
        <Route path="/profile" render={() => (isAuth ? <ProfileContainer /> : <Redirect to="/signin" />)} />

      </Switch>
    </div>
  );
};

export default connect(({ user }) => ({ isAuth: user.isAuth }))(App);
