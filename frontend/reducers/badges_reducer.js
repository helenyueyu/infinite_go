import { RECEIVE_BADGES, RECEIVE_BADGE } from '../actions/badges_actions';

const badgesReducer = (state = {}, action) => {
    Object.freeze(state);

    let newState = Object.assign({}, state);
    // debugger 
    switch (action.type) {
        case RECEIVE_BADGES:
            return action.badges;
        case RECEIVE_BADGE:
            newState[action.badge.id] = action.badge;
            return newState;
        default:
            return state;
    }
}

export default badgesReducer;

