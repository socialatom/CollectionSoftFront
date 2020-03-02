import React from 'react'
import Layout from '../layouts/app'
import { Switch, Route } from 'react-router-dom'

import List from './list'
import Create from './create'
import Update from './update'

import {
    STAFF,
    CREATE_STAFF,
    EDIT_STAFF
} from '../../constants/routes'

function index(props) {
    return (
        <div>
            <Switch>
                <Route exact path={STAFF} component={List}/>
                <Route path={CREATE_STAFF} component={Create}/>
                <Route path={`${EDIT_STAFF}:staffProfileId`} component={Update}/>
            </Switch>
        </div>
    )
}

export default Layout(index)
