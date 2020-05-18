import * as userAPIUtil from '../util/users_api_util'; 

export const RECEIVE_USERS = 'RECEIVE_USERS'; 

const receiveUsers = users => {
    return ({
        type: RECEIVE_USERS,
        users
    })
}

export const fetchUsers = () => dispatch => {
    return userAPIUtil.getUsers()
        .then(users => {
            dispatch(receiveUsers(users))
        });
}
