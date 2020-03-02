import React, { useEffect } from 'react'
import { Form, Field } from 'react-final-form'
import { useDispatch, useSelector } from "react-redux"
import renderField from '../../components/FormInputs/renderField'
import { updateStaff } from '../../actions/staff'
import { useParams } from 'react-router-dom'
import validate from './validations'
import {
    getStaff,
    resetStaff
} from '../../actions/staff'

const UpdateStaffForm = () => {
  const is_processing = useSelector(state => state.Staff.is_processing)
  const finished_processing = useSelector(state => state.Staff.finished_processing)
  const initialValues = useSelector(state => ({
    staffFirstName: state.Staff.staffFirstName,
    staffLastName: state.Staff.staffLastName,
    staffEmail: state.Staff.staffEmail,
    staffCampus: state.Staff.staffCampus,
    staffIdentificationType: state.Staff.staffIdentificationType,
    staffIdentificationNumber: state.Staff.staffIdentificationNumber
  }))
  const error = useSelector(state => state.Staff.error)
  const dispatch = useDispatch()
  let { staffProfileId } = useParams()

  const fetchStaffData = () => {
    dispatch(getStaff(staffProfileId))
  }

  useEffect(() => {
    fetchStaffData()
    return () => {
      dispatch(resetStaff('update'))
    }
  }, [])
  
  return (
    <div className="row">
    <div className="col-md-12">
      <div className="card">
        <div className="header">
          <h4>Edit Staff</h4>
        </div>
        <Form
          initialValues={initialValues}
          onSubmit={values => {
            alert('submitting')
            dispatch(updateStaff(values))
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
              <label className="col-sm-3 control-label">Repeat Email</label>
              <div className="col-sm-9">
                <Field type="email" name="staffEmail2" component="input" className="form-control" />
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
              <label className="col-sm-3 control-label">Identification Type</label>
              <div className="col-sm-9">
                <Field type="text" name="staffPosition" component="input" className="form-control" />
              </div>
            </div>
            <div className="form-group">
              <label className="col-sm-3 control-label">Identification Number</label>
              <div className="col-sm-9">
                <Field type="text" name="staffImage" component="input" className="form-control" />
              </div>
            </div>
          </div>
          <div className="footer text-right">
            <button type="submit" className="btn btn-info btn-fill" disabled={is_processing}>
              Update Staff User
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

export default UpdateStaffForm;

