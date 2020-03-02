import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import Layout from '../layouts/auth'
import renderField from '../../components/FormInputs/renderField'
import { Form, Field } from 'react-final-form'
import astorgaLogo from '../../assets/images/astorga_logo.png'
import {signIn} from '../../actions/signin'
import { Redirect } from 'react-router-dom'
import {
    DASHBOARD
} from '../../constants/routes'


const validate = values => {
    const errors = {};
    if (!values.required) {
      errors.required = 'This field is required';
    }
    if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Please enter a valid email';
    }
    if (values.number) {
      errors.number = 'Please enter a number';
    }
    return errors;
}

const SignIn = ({
    handleSubmit
  }) =>{
    const authenticated = useSelector(state => state.Auth.authenticated)
    const is_authenticating = useSelector(state => state.Auth.is_authenticating)
    const dispatch = useDispatch()

    if(authenticated) {
        return (<Redirect to={DASHBOARD} />)
    }
    
    return (<div className="row">
        <div className="col-xs-12 col-sm-5 col-sm-offset-3">
        <div className="card">
            <img
                style={{width: "150px"}}
                src={astorgaLogo} 
                className="card-img-top center-block"
                alt="..." 
            />
            <div className="card-body">
            <div className="header text-center"><h4><b>Sign In</b></h4></div>
            <Form
                onSubmit={values => {
                    dispatch(signIn(values.email, values.password))
                }}
                validate={validate}
            >
            {({ handleSubmit, pristine, form, submitting }) => (
            <form className="form-horizontal" onClick={handleSubmit}>
                <div className="content">
                    <div className="form-group">
                    <label className="col-sm-3 control-label">Email</label>
                    <div className="col-sm-9">
                        <Field
                        type="email"
                        name="email"
                        required
                        component={renderField} />
                    </div>
                    </div>

                    <div className="form-group">
                    <label className="col-sm-3 control-label">Password</label>
                    <div className="col-sm-9">
                        <Field
                        type="password"
                        name="password"
                        required
                        component={renderField} />
                    </div>
                    </div>
                </div>
                <div className="footer text-center">
                    <button type="submit" className="btn btn-info btn-fill" disabled={is_authenticating}>Submit</button>
                </div>
            </form>
            )}
            </Form>
            </div>
            </div>
        </div>
    </div>)
}

export default Layout(SignIn)
