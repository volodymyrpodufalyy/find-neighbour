import React from "react";
import { Route } from "react-router-dom";

import { LoginForm, RegisterForm, AddInfoForm } from "modules";
import checkInfo from "./components/checkInfo";

import "./Auth.scss";

const Auth = () => (
  <section className="auth">
    <div className="auth__content">
      <Route exact path="/signin" component={LoginForm} />
      <Route exact path="/signup" component={RegisterForm} />
      <Route exact path="/addinfo" component={AddInfoForm} />
      <Route exact path="/signup/verify" component={checkInfo} />
    </div>
  </section>
);

export default Auth;
