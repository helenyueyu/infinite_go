import * as userAPIUtil from '../util/users_api_util'; 

export const RECEIVE_USERS = 'RECEIVE_USERS'; 
export const RECEIVE_USER = 'RECEIVE_USER'; 

const receiveUsers = users => {
    return ({
        type: RECEIVE_USERS,
        users
    })
}

const receiveUser = user => {
    // debugger; 
    return ({
        type: RECEIVE_USER, 
        user 
    })
}

export const fetchUser = (id) => dispatch => {
    return userAPIUtil.getUser(id)
        .then(user => {
            // debugger; 
            dispatch(receiveUser(user))
        });
}

export const fetchUsers = () => dispatch => {
    return userAPIUtil.getUsers()
        .then(users => {
            dispatch(receiveUsers(users))
        });
}

export const searchUsers = query => dispatch => {
    return userAPIUtil.searchUsers(query)
        .then(users => {
            dispatch(receiveUsers(users))
        })
}