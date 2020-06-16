import { RECEIVE_BADGES } from '../actions/badges_actions';

const badgesReducer = (state = {}, action) => {
    Object.freeze(state);

    let newState = Object.assign({}, state);

    switch (action.type) {
        case RECEIVE_BADGES:
            return action.badges;
        default:
            return state;
    }
}

export default badgesReducer;

