import Amplify from '../utils/amplify'
import capitalize from '../utils/capitalize'

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

export const resetStudent = actionType => {
    switch (actionType) {
        case "update": 
            return {type: RESET_STUDENT_UPDATE}
        case "create": 
            return {type: RESET_STUDENT_CREATION}
        case "delete": 
            return {type: RESET_STUDENT_DELETE}
        case "get": 
            return {type: RESET_GETTING_USER}
    }
}

export const listStudents = () => async dispatch => {
    dispatch({type: LISTING_STUDENTS});
    const onSuccess = response => {
        const responseData = JSON.parse(response.result)
        const data = responseData.map(function(object) {
            object.studentName = object.studentFirstName + " " + object.studentLastName
            object.studentCampus = capitalize(object.studentCampus)
            object.studentIdentificationType = capitalize(object.studentIdentificationType)
            return object;
        });
        dispatch({type: LISTING_STUDENTS_SUCCESS, payload: data})
        return data
    }

    const onError = error => {
        console.error("Student listing error", error)
        dispatch({type: LISTING_STUDENTS_ERROR, payload: "Student Listing Error"})
        return error
    }

    try {
        let response = await Amplify.API.get("astorgacollections-backend", "/student");
        return  onSuccess(response)
    } catch (error) {
        return onError(error)
    }
}

export const createStudent = studentFields => async dispatch => {
    dispatch({type: CREATING_STUDENT});
    const onSuccess = response => {
        dispatch({type: CREATING_STUDENT_SUCCESS, payload: JSON.parse(response.result)});
        return response
    }

    const onError = error => {
        if (error.response !== undefined && error.response.data !== undefined) {
            console.error("Student Creation Error", error.response.data)
            dispatch({type: CREATING_STUDENT_ERROR, payload: "Student Creation Error"})
        } else {
            console.error("User creation error while creating Student", error)
            dispatch({type: CREATING_STUDENT_ERROR, payload: "User creation error while creating Student"})
        }

        return error
    }
    try {
        let response = await Amplify.API.post("astorgacollections-backend", "/student", {
            body: {
                ...studentFields
            }
        });

        return onSuccess(response)
    } catch (error) {
        return onError(error)
    }
}

export const getStudent = profileId => async dispatch => {
    dispatch({type: GETTING_USER});
    const onSuccess = response => {
        dispatch({type: GETTING_USER_SUCCESS, payload: response.result});
        return response
    }

    const onError = error => {
        console.error("Student Getting error", error)
        dispatch({type: GETTING_USER_ERROR, payload: "Student Listing Error"})
        return error
    }

    try {
        let response = await Amplify.API.get("astorgacollections-backend", `/student/${profileId}`)
        return onSuccess(response)
    } catch (error) {
        return onError(error)
    }

}

export const updateStudent = (studentFields) => async dispatch => {
    dispatch({type: UPDATING_STUDENT});
    const onSuccess = response => {
        dispatch({type: UPDATING_STUDENT_SUCCESS, payload: JSON.parse(response.result)})
        return response
    }

    const onError = error => {
        dispatch({type: UPDATING_STUDENT_ERROR, payload: "Error while updating the user"})
    }

    try {
        let response = await Amplify.API.put("astorgacollections-backend", "/student", {
            body: {
                ...studentFields
            }
        })

        return onSuccess(response)
    } catch (error) {
        return onError(error)
    }
}

export const deleteStudent = studentId => async dispatch => {
    dispatch({type: DELETING_STUDENT});
    const onSuccess = response => {
        dispatch({type: DELETING_STUDENT_SUCCESS});
        dispatch(listStudents())
        return response
    }

    const onError = error => {
        dispatch({type: DELETING_STUDENT_ERROR, payload: "Deleting student error"})
        return error
    }

    try {
        let response = await Amplify.API.del("astorgacollections-backend", `/student/${studentId}`)
        return onSuccess(response)
    } catch (error) {
        console.error(error)
        return onError(error)
    }
}