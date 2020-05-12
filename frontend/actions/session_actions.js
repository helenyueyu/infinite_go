import * as sessionAPIUtil from '../util/session_api_util';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';

export const login = user => dispatch => (
    sessionAPIUtil.login(user)
        .then(user => dispatch(receiveCurrentUser(user)))
        .fail(errors => dispatch(receiveSessionErrors(errors)))
)

export const logout = () => dispatch => (
    sessionAPIUtil.logout()
        .then(() => dispatch(logoutCurrentUser()))
        .fail(errors => dispatch(receiveSessionErrors(errors)))
)

export const signup = user => dispatch => (
    sessionAPIUtil.signup(user)
        .then(user => dispatch(receiveCurrentUser(user)))
        .fail(errors => dispatch(receiveSessionErrors(errors)))
)

const receiveCurrentUser = currentUser => ({
    type: RECEIVE_CURRENT_USER,
    currentUser
})

const logoutCurrentUser = () => ({
    type: LOGOUT_CURRENT_USER
})

const receiveSessionErrors = errors => ({
    type: RECEIVE_SESSION_ERRORS,
    errors
})
