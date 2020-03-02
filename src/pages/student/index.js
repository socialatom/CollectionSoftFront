import React from 'react'
import Layout from '../layouts/app'
import { Switch, Route } from 'react-router-dom'

import List from './list'
import Create from './create'
import Update from './update'

import {
    STUDENT,
    CREATE_STUDENT,
    EDIT_STUDENT,
} from '../../constants/routes'

function index(props) {
    return (
        <div>
            <Switch>
                <Route exact path={STUDENT} component={List}/>
                <Route path={CREATE_STUDENT} component={Create}/>
                <Route path={`${EDIT_STUDENT}:studentProfileId`} component={Update}/>
            </Switch>
        </div>
    )
}

export default Layout(index)
