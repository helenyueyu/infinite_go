import { RECEIVE_USERS, RECEIVE_USER } from '../actions/users_actions';

const usersReducer = (state = {}, action) => {
    Object.freeze(state);

    let newState = Object.assign({}, state);

    switch (action.type) {
        case RECEIVE_USER: 
            newState[action.user.id] = action.user; 
            return newState; 
        case RECEIVE_USERS:
            return action.users;
        default:
            return state;
    }
}

export default usersReducer;