import Amplify from '../utils/amplify'
import capitalize from '../utils/capitalize'

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

export const resetStaff = actionType => {
    switch (actionType) {
        case "update": 
            return {type: RESET_STAFF_UPDATE}
        case "create": 
            return {type: RESET_STAFF_CREATION}
        case "delete": 
            return {type: RESET_STAFF_DELETE}
        case "get": 
            return {type: RESET_GETTING_STAFF}
    }
}

export const listStaffs = () => async dispatch => {
    dispatch({type: LISTING_STAFFS});

    try {
        let response = await Amplify.API.get("astorgacollections-backend", "/staff");
        const responseData = JSON.parse(response.result)
        const data = responseData.map(function(object) {
            object.staffName = object.staffFirstName + " " + object.staffLastName
            object.staffCampus = capitalize(object.staffCampus)
            object.staffIdentificationType = capitalize(object.staffIdentificationType)
            return object;
        });
        return dispatch({type: LISTING_STAFFS_SUCCESS, payload: data});
    } catch (error) {
        return dispatch({type: LISTING_STAFFS_ERROR, payload: "Staff Listing Error"})
    }
}

export const createStaff = staffFields => async dispatch => {
    dispatch({type: CREATING_STAFF});

    const onError = error => {
        

        return error
    }
    try {
        let response = await Amplify.API.post("astorgacollections-backend", "/staff", {
            body: {
                ...staffFields
            }
        });

        return dispatch({type: CREATING_STAFF_SUCCESS, payload: JSON.parse(response.result)});
    } catch (error) {
        if (error.response !== undefined && error.response.data !== undefined) {
            return dispatch({type: CREATING_STAFF_ERROR, payload: "Staff Creation Error"})
        } else {
            return dispatch({type: CREATING_STAFF_ERROR, payload: "User creation error while creating Staff"})
        }
    }
}

export const getStaff = profileId => async dispatch => {
    dispatch({type: GETTING_STAFF});

    try {
        let response = await Amplify.API.get("astorgacollections-backend", `/staff/${profileId}`)
        return dispatch({type: GETTING_STAFF_SUCCESS, payload: response.result});
    } catch (error) {
        return dispatch({type: GETTING_STAFF_ERROR, payload: "Staff Listing Error"})
    }

}

export const updateStaff = (staffFields) => async dispatch => {
    dispatch({type: UPDATING_STAFF});

    try {
        let response = await Amplify.API.put("astorgacollections-backend", "/staff", {
            body: {
                ...staffFields
            }
        })

        return dispatch({type: UPDATING_STAFF_SUCCESS, payload: JSON.parse(response.result)})
    } catch (error) {
        return dispatch({type: UPDATING_STAFF_ERROR, payload: "Error while updating the user"})
    }
}

export const deleteStaff = staffId => async dispatch => {
    dispatch({type: DELETING_STAFF});

    try {
        let response = await Amplify.API.del("astorgacollections-backend", `/staff/${staffId}`)
        dispatch({type: DELETING_STAFF_SUCCESS});
        return dispatch(listStaffs())
    } catch (error) {
        return dispatch({type: DELETING_STAFF_ERROR, payload: "Deleting staff error"})
    }
}