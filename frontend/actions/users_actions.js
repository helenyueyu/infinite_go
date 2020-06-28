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
    return ({
        type: RECEIVE_USER, 
        user 
    })
}

export const fetchUser = (id) => dispatch => {
    return userAPIUtil.getUser(id)
        .then(user => {
            dispatch(receiveUser(user))
        });
}

export const updateUser = user => dispatch => {
    return userAPIUtil.updateUser(user)
        .then(user => {
            dispatch(receiveUser(user))
        })
}

export const fetchUsers = () => dispatch => {
    return userAPIUtil.getUsers()
        .then(users => {
            dispatch(receiveUsers(users))
        });
}

export const fetchPaginatedUsers = (pageNumber, pageLimit, filter) => dispatch => {
    return userAPIUtil.getPaginatedUsers(pageNumber, pageLimit, filter)
        .then(users => {
            dispatch(receiveUsers(users)); 
        })
}

export const searchUsers = query => dispatch => {
    return userAPIUtil.searchUsers(query)
        .then(users => {
            dispatch(receiveUsers(users))
        })
}


