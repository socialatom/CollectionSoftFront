import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table"
import ActionButtons from '../../components/tableActionButtons'
import { listStudents, deleteStudent } from '../../actions/student'
import { Link } from "react-router-dom"

const List = props => {
  const is_processing = useSelector(state => state.Student.is_processing)
  const studentsList = useSelector(state => state.Student.studentsList)

  const actionButton = (_cell, row, _enumObject, _rowIndex) => {
    const properties = {
      deleteUrl: `/student/delete/${row.studentProfileId}`,
      callback: () => {
        dispatch(deleteStudent(row.studentProfileId))
      },
    }
    return <ActionButtons {...properties}/>
  }
  
  const emailLink = (cell, row, enumObject, rowIndex) => {
    return <Link to={`/student/edit/${row.studentProfileId}`} style={{"linkDecoration": "underline", "color": "#0000FF"}}>
      {row.studentEmail}
    </Link> 
  }

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(listStudents())
  }, [])

  if (is_processing) return <div>Loading...</div>
  
  const options = {
    sizePerPage: 15,
    prePage: "Previous",
    nextPage: "Next",
    firstPage: "First",
    lastPage: "Last",
    hideSizePerPage: true
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="header">
              <h4>All Students</h4>
              <p>List of all Students registered in the Platform</p>
            </div>
            <div className="content">
              <BootstrapTable data={studentsList} 
                striped
                hover
                condensed
                pagination
                search 
                options={options}>

                <TableHeaderColumn dataField="studentEmail" isKey filter={{ type: "TextFilter" }} dataSort dataFormat={emailLink}>
                  Email
                </TableHeaderColumn>
                <TableHeaderColumn dataField="studentName" filter={{ type: "TextFilter" }} dataSort>
                  Name
                </TableHeaderColumn>
                <TableHeaderColumn dataField="studentCampus" width="100px" dataSort>
                  Campus
                </TableHeaderColumn>
                <TableHeaderColumn dataField="studentIdentificationNumber" dataSort>
                  Identification Number
                </TableHeaderColumn>
                <TableHeaderColumn dataField="sessionDetails" dataFormat={actionButton} width="100px">
                  Actions
                </TableHeaderColumn>
              </BootstrapTable>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default List;