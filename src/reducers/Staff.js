import {
    RESET_STAFF_CREATION,
    CREATING_STAFF,
    CREATING_STAFF_SUCCESS,
    CREATING_STAFF_ERROR,
    RESET_STAFF_UPDATE,
    UPDATING_STAFF,
    UPDATING_STAFF_SUCCESS,
    UPDATING_STAFF_ERROR,
    RESET_STAFF_DELETE,
    DELETING_STAFF,
    DELETING_STAFF_SUCCESS,
    DELETING_STAFF_ERROR,
    RESET_GETTING_STAFF,
    GETTING_STAFF,
    GETTING_STAFF_SUCCESS,
    GETTING_STAFF_ERROR,
    LISTING_STAFFS,
    LISTING_STAFFS_SUCCESS,
    LISTING_STAFFS_ERROR
  } from '../constants/actions'

  const default_state = {
    staffFirstName: "",
    staffLastName: "",
    staffEmail: "",
    staffCampus: "",
    staffPosition: "",
    staffImage: "",
    staffId: "",
    finished_processing: false,
    is_processing: false,
    error: "",
    STAFFsList: []
  }

  export default (state = default_state, action) => {
    switch (action.type) {
        case UPDATING_STAFF:
        case DELETING_STAFF:
        case CREATING_STAFF:
        case GETTING_STAFF:
            return {...default_state, is_processing: true, finished_processing: false, error: ""}
        case RESET_STAFF_CREATION:
        case RESET_STAFF_DELETE:
        case RESET_STAFF_UPDATE:
        case RESET_GETTING_STAFF:
            return default_state
        case CREATING_STAFF_ERROR:
        case UPDATING_STAFF_ERROR:
        case DELETING_STAFF_ERROR:
        case GETTING_STAFF_ERROR:
            return {...state, is_processing: false, error: action.payload, finished_processing: false}
        case CREATING_STAFF_SUCCESS:
            return {...state, 
                ...action.payload,
                is_processing: false,
                finished_processing: true,
                error: ""};
        case UPDATING_STAFF_SUCCESS:
            return {...state, 
                ...action.payload,
                is_processing: false,
                finished_processing: true,
                error: ""};
        case GETTING_STAFF_SUCCESS:
            return {...state, 
                ...action.payload,
                is_processing: false,
                finished_processing: true,
                error: ""};
        case DELETING_STAFF_SUCCESS: 
            return {...state, is_processing: false, finished_processing: false, STAFFsList: []}
        case LISTING_STAFFS: 
            return {...default_state, is_processing: true}
        case LISTING_STAFFS_SUCCESS:
            return {...state, is_processing: false, finished_processing: true, STAFFsList: action.payload}
        case LISTING_STAFFS_ERROR: 
            return {...default_state, is_processing: false, error: action.payload, finished_processing: true}
        default: 
            return state;
    }
  }

