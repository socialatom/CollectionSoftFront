import React, { useEffect } from 'react'
import { useDispatch } from "react-redux"
import { Switch, Route } from 'react-router-dom'

import PrivateRoute from '../../components/PrivateRoute'
import SignIn from '../signin'
import Dashboard from '../dashboard'
import Student from '../student'
import Staff from '../staff'
import Profile from '../profile'

import * as Routes from '../../constants/routes'
import { checkAuth } from '../../actions/signin'

const index = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkAuth());
  });

  return (
    <div className="content">
      <div className="container-fluid container-fluid-padding-fix">
        <Switch>
          <Route exact path={Routes.SIGN_IN} component={SignIn} />
          <PrivateRoute>
            <Route exact path={Routes.DASHBOARD} component={Dashboard} />
            <Route path={Routes.STUDENT} component={Student} />
            <Route path={Routes.STAFF} component={Staff} />
            {/* <Route path={Routes.PROFILE} component={Profile} /> */}
          </PrivateRoute>
        </Switch>
      </div>
    </div>
  );
}

export default index
