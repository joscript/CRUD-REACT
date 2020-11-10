import {
    FETCH_USERS_REQUEST, 
    FETCH_USERS_SUCCESS, 
    FETCH_USERS_ERROR
} from './userActionTypes';

export const fetchUsersRequest = () => {
    return {
        type: FETCH_USERS_REQUEST
    }
}

export const fetchUsersSuccess = (users) => {
    return {
        type: FETCH_USERS_SUCCESS,
        payload: users
    }
}

export const fetchUsersError = (error) => {
    return {
        type: FETCH_USERS_ERROR,
        payload: error
    }
}


// woth the use of thunk to return a function . it doenst need to be pure function 
export const fetchUsers = () => {   
    return (dispatch) => {
        dispatch(fetchUsersRequest());
        window.axios.get('http://127.0.0.1:8000/api/users')
            .then((response) => {
                dispatch(fetchUsersSuccess(response.data))
            })
            .catch((error) => {
                dispatch(fetchUsersError(error.message))
            })
    }
}
