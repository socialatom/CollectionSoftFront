import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table"
import ActionButtons from '../../components/tableActionButtons'
import { listStaffs, deleteStaff } from '../../actions/staff'
import { Link } from "react-router-dom"

const List = props => {
  const is_processing = useSelector(state => state.Staff.is_processing)
  const staffsList = useSelector(state => state.Staff.staffsList)

  const actionButton = (_cell, row, _enumObject, _rowIndex) => {
    const properties = {
      deleteUrl: `/staff/delete/${row.staffProfileId}`,
      callback: () => {
        dispatch(deleteStaff(row.staffProfileId))
      },
    }
    return <ActionButtons {...properties}/>
  }
  
  const emailLink = (cell, row, enumObject, rowIndex) => {
    return <Link to={`/staff/edit/${row.staffProfileId}`} style={{"linkDecoration": "underline", "color": "#0000FF"}}>
      {row.staffEmail}
    </Link> 
  }

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(listStaffs())
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
              <h4>All Staff</h4>
              <p>List of all Staff registered in the Platform</p>
            </div>
            <div className="content">
              <BootstrapTable data={staffsList} 
                striped
                hover
                condensed
                pagination
                search 
                options={options}>

                <TableHeaderColumn dataField="staffEmail" isKey filter={{ type: "TextFilter" }} dataSort dataFormat={emailLink}>
                  Email
                </TableHeaderColumn>
                <TableHeaderColumn dataField="staffName" filter={{ type: "TextFilter" }} dataSort>
                  Name
                </TableHeaderColumn>
                <TableHeaderColumn dataField="staffCampus" width="100px" dataSort>
                  Campus
                </TableHeaderColumn>
                <TableHeaderColumn dataField="staffPosition" dataSort>
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