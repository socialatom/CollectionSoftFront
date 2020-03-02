import Amplify from '../utils/amplify'
import {
    SIGNING_IN,
    SIGN_IN_SUCCESS,
    SIGN_IN_ERROR
  } from '../constants/actions'


export const signIn = (email, password) => dispatch => {
    dispatch({type: SIGNING_IN});
    return Amplify.Auth.signIn({username: email, password})
        .then(user => {
            dispatch({type: SIGN_IN_SUCCESS, payload: user});
            Amplify.API.get("astorgacollections-backend", "/user")
                .then(user => {
                    console.log('USER INFO', JSON.parse(user.result))
                    dispatch({type: SIGN_IN_SUCCESS, payload: JSON.parse(user.result)})
                })
                .catch(error => {
                    console.error(error)
                    dispatch({type: SIGN_IN_ERROR, payload: {error}})
                });
        })
        .catch(error => dispatch({type: SIGN_IN_ERROR, payload: {error}}));
}

export const checkAuth = () => dispatch => {
    dispatch({type: SIGNING_IN});
    return Amplify.Auth.currentSession()
            .then(session => {
                dispatch({
                    type: SIGN_IN_SUCCESS,
                    payload: {...session}
                })
                Amplify.Auth.currentAuthenticatedUser({
                    bypassCache: true  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
                }).then(usrSession => {
                    Amplify.API.get("astorgacollections-backend", "/user")
                        .then(user => {
                            dispatch({
                                type: SIGN_IN_SUCCESS,
                                payload: {...JSON.parse(user.result), username: usrSession.username, ...session}
                            })
                        })
                        .catch(error => {
                            console.error(error)
                            dispatch({type: SIGN_IN_ERROR, payload: {error}})
                        });
                })
                .catch(error => {
                    dispatch({type: SIGN_IN_ERROR, payload: {error}})
                });
            })
            .catch(error => {
                dispatch({type: SIGN_IN_ERROR, payload: {error}})
            });
}

