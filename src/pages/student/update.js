import React, { useEffect } from 'react'
import { Form, Field } from 'react-final-form'
import { useDispatch, useSelector } from "react-redux"
import renderField from '../../components/FormInputs/renderField'
import { updateStudent } from '../../actions/student'
import { useParams } from 'react-router-dom'
import validate from './validations'
import {
    getStudent,
    resetStudent
} from '../../actions/student'

const UpdateStudentForm = () => {
  const is_processing = useSelector(state => state.Student.is_processing)
  const finished_processing = useSelector(state => state.Student.finished_processing)
  const initialValues = useSelector(state => ({
    studentFirstName: state.Student.studentFirstName,
    studentLastName: state.Student.studentLastName,
    studentEmail: state.Student.studentEmail,
    studentCampus: state.Student.studentCampus,
    studentIdentificationType: state.Student.studentIdentificationType,
    studentIdentificationNumber: state.Student.studentIdentificationNumber
  }))
  const error = useSelector(state => state.Student.error)
  const dispatch = useDispatch()
  let { studentProfileId } = useParams()

  const fetchStudentData = () => {
    dispatch(getStudent(studentProfileId))
  }

  useEffect(() => {
    fetchStudentData()
    return () => {
      dispatch(resetStudent('update'))
    }
  }, [])
  
  return (
    <div className="row">
    <div className="col-md-12">
      <div className="card">
        <div className="header">
          <h4>Edit Student</h4>
        </div>
        <Form
          initialValues={initialValues}
          onSubmit={values => {
            alert('submitting')
            dispatch(updateStudent(values))
          }}
        >
        {({ handleSubmit, pristine, form, submitting }) => (
        <form className="form-horizontal" onSubmit={handleSubmit}>
          <div className="content">
            <div className="form-group">
              <label className="col-sm-3 control-label">First Name</label>
              <div className="col-sm-9">
                <Field type="text" name="studentFirstName" component="input" className="form-control"/>
              </div>
            </div>
            <div className="form-group">
              <label className="col-sm-3 control-label">Last Name</label>
              <div className="col-sm-9">
                <Field type="text" name="studentLastName" component="input" className="form-control" />
              </div>
            </div>
            <div className="form-group">
              <label className="col-sm-3 control-label">Email</label>
              <div className="col-sm-9">
                <Field type="email" name="studentEmail" component="input" className="form-control" />
              </div>
            </div>
            <div className="form-group">
              <label className="col-sm-3 control-label">Campus</label>
              <div className="col-sm-9">
                <Field type="select" name="studentCampus" component="select" className="form-control">
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
                <Field type="select" name="studentIdentificationType" component="select" className="form-control">
                  <option value="passport">Passport</option>
                  <option value="drivinglicense">Driving License</option>
                  <option value="nationalid">National ID</option>
                </Field>
              </div>
            </div>
            <div className="form-group">
              <label className="col-sm-3 control-label">Identification Number</label>
              <div className="col-sm-9">
                <Field type="text" name="studentIdentificationNumber" component="input" className="form-control" />
              </div>
            </div>
          </div>
          <div className="footer text-right">
            <button type="submit" className="btn btn-info btn-fill" disabled={is_processing}>
              Update Student User
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

export default UpdateStudentForm;

