import React from 'react'
import { Form, Field } from 'react-final-form'
import { useDispatch, useSelector } from "react-redux"
import renderField from '../../components/FormInputs/renderField'
import { createStaff } from '../../actions/staff'
import validate from './validations'

const CreateStaffForm = () => {
  const is_processing = useSelector(state => state.Staff.is_processing)
  const dispatch = useDispatch()

  return (
    <div className="row">
    <div className="col-md-12">
      <div className="card">
        <div className="header">
          <h4>New Staff User</h4>
        </div>
        <Form
          onSubmit={values => {
            dispatch(createStaff(values))
          }}
        >
        {({ handleSubmit, pristine, form, submitting }) => (
        <form className="form-horizontal" onSubmit={handleSubmit}>
          <div className="content">
            <div className="form-group">
              <label className="col-sm-3 control-label">First Name</label>
              <div className="col-sm-9">
                <Field type="text" name="staffFirstName" component="input" className="form-control"/>
              </div>
            </div>
            <div className="form-group">
              <label className="col-sm-3 control-label">Last Name</label>
              <div className="col-sm-9">
                <Field type="text" name="staffLastName" component="input" className="form-control" />
              </div>
            </div>
            <div className="form-group">
              <label className="col-sm-3 control-label">Email</label>
              <div className="col-sm-9">
                <Field type="email" name="staffEmail" component="input" className="form-control" />
              </div>
            </div>
            <div className="form-group">
              <label className="col-sm-3 control-label">Campus</label>
              <div className="col-sm-9">
                <Field type="select" name="staffCampus" component="select" className="form-control">
                  <option value="cali">Cali</option>
                  <option value="medellin">Medellin</option>
                  <option value="bogota">Bogotá</option>
                  <option value="barranquilla">Barranquilla</option>
                </Field>
              </div>
            </div>
            <div className="form-group">
              <label className="col-sm-3 control-label">Staff Position</label>
              <div className="col-sm-9">
                <Field type="text" name="staffPosition" component="input" className="form-control" />
              </div>
            </div>
            <div className="form-group">
              <label className="col-sm-3 control-label">Image</label>
              <div className="col-sm-9">
                <Field type="text" name="staffImage" component="input" className="form-control" />
              </div>
            </div>
          </div>
          <div className="footer text-right">
            <button type="submit" className="btn btn-info btn-fill" disabled={is_processing}>
              Create Staff User
            </button>
          </div>
        </form>
        )}
        </Form>
      </div>
    </div>
  </div>
  )
}

export default CreateStaffForm

