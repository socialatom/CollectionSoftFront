import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from "react-router-dom"
import swal from '@sweetalert/with-react'

const tableActionButtons = props => {
    const { editUrl, createUrl, deleteUrl, entityName, callback } = props

    const displayWarning = () => {
        swal({
            title: "Are you sure you want to delete this Record?",
            text: "You will not be able to recover this information!",
            icon: "warning",
            dangerMode: true,
            buttons: {
                cancel: {
                    text: "Cancel",
                    value: false,
                    visible: true,
                    closeModal: true,
                },
                confirm: {
                    text: "Confirm",
                    value: true,
                    visible: true,
                    closeModal: true,
                }
            }
        })
        .then(result => {
            if(result){
                callback()
            }
        })
    }

    return (
        <Fragment>
            {
                editUrl ?
                <Link to={editUrl} className="btn btn-primary">
                    Edit {entityName}
                </Link> : ""
            }
            { 
                createUrl ?
                <Link to={createUrl} className="btn btn-info">
                    Create {entityName}
                </Link> : ""
            }
            {
                deleteUrl ?
                <button onClick={() => {displayWarning()}} className="btn btn-danger">
                    Delete {entityName}
                </button> : ""
            }
        </Fragment>
    );
}

tableActionButtons.propTypes = {
    editUrl: PropTypes.string.isRequired,
    createUrl: PropTypes.string.isRequired,
    deleteUrl: PropTypes.string.isRequired,
    entityName: PropTypes.string.isRequired,
    callback: PropTypes.func.isRequired
}

tableActionButtons.defaultProps = {
    editUrl: "",
    createUrl: "",
    deleteUrl: "",
    entityName: "",
    callback: () => {}
}

export default tableActionButtons

