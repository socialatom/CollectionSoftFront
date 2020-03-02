import {
    RESET_STUDENT_CREATION,
    CREATING_STUDENT,
    CREATING_STUDENT_SUCCESS,
    CREATING_STUDENT_ERROR,
    RESET_STUDENT_UPDATE,
    UPDATING_STUDENT,
    UPDATING_STUDENT_SUCCESS,
    UPDATING_STUDENT_ERROR,
    RESET_STUDENT_DELETE,
    DELETING_STUDENT,
    DELETING_STUDENT_SUCCESS,
    DELETING_STUDENT_ERROR,
    RESET_GETTING_USER,
    GETTING_USER,
    GETTING_USER_SUCCESS,
    GETTING_USER_ERROR,
    LISTING_STUDENTS,
    LISTING_STUDENTS_SUCCESS,
    LISTING_STUDENTS_ERROR
  } from '../constants/actions'

  const default_state = {
    studentFirstName: "",
    studentLastName: "",
    studentEmail: "",
    studentCampus: "",
    studentIdentificationType: "",
    studentIdentificationNumber: "",
    studentProfileId: "",
    finished_processing: false,
    is_processing: false,
    error: "",
    studentsList: []
  }

  export default (state = default_state, action) => {
    switch (action.type) {
        case UPDATING_STUDENT:
        case DELETING_STUDENT:
        case CREATING_STUDENT:
        case GETTING_USER:
            return {...default_state, is_processing: true, finished_processing: false, error: ""}
        case RESET_STUDENT_CREATION:
        case RESET_STUDENT_DELETE:
        case RESET_STUDENT_UPDATE:
        case RESET_GETTING_USER:
            return default_state
        case CREATING_STUDENT_ERROR:
        case UPDATING_STUDENT_ERROR:
        case DELETING_STUDENT_ERROR:
        case GETTING_USER_ERROR:
            return {...state, is_processing: false, error: action.payload, finished_processing: false}
        case CREATING_STUDENT_SUCCESS:
            return {...state, 
                ...action.payload,
                is_processing: false,
                finished_processing: true,
                error: ""};
        case UPDATING_STUDENT_SUCCESS:
            return {...state, 
                ...action.payload,
                is_processing: false,
                finished_processing: true,
                error: ""};
        case GETTING_USER_SUCCESS:
            return {...state, 
                ...action.payload,
                is_processing: false,
                finished_processing: true,
                error: ""};
        case DELETING_STUDENT_SUCCESS: 
            return {...state, is_processing: false, finished_processing: false, studentsList: []}
        case LISTING_STUDENTS: 
            return {...default_state, is_processing: true}
        case LISTING_STUDENTS_SUCCESS:
            return {...state, is_processing: false, finished_processing: true, studentsList: action.payload}
        case LISTING_STUDENTS_ERROR: 
            return {...default_state, is_processing: false, error: action.payload, finished_processing: true}
        default: 
            return state;
    }
  }

