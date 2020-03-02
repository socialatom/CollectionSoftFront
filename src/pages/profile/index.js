import React from "react";
import Layout from "../layouts/app";
import { Switch, Route } from "react-router-dom";

import Profile from "./profile";
import EditProfile from "./editprofile";

import {
  PROFILE,
  EDIT_PROFILE,
} from "../../constants/routes";

function index(props) {
  return (
    <div>
      Profile
      <Switch>
        <Route exact path={PROFILE} component={Profile} />
        <Route exact path={EDIT_PROFILE} component={EditProfile} />
      </Switch>
    </div>
  );
}

export default Layout(index);
