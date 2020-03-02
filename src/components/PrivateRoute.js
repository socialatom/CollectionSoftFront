import React, { Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import { useSelector } from "react-redux"
import {
    SIGN_IN
} from '../constants/routes'

const PrivateRoute = (props) => {
    const authenticated = useSelector(state => state.Auth.authenticated)
    return (
        <Fragment>
            { authenticated ? props.children : <Redirect to={SIGN_IN} /> }
        </Fragment>
    )
}

export default PrivateRoute;