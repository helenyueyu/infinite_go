import { RECEIVE_VOTE, REMOVE_VOTE } from '../actions/votes_actions'; 

const votesReducer = (state = {}, action) => {
    Object.freeze(state);

    let newState = Object.assign({}, state);

    switch (action.type) {
        case RECEIVE_VOTE:
            newState[action.vote.id] = action.vote; 
            return newState; 
        case REMOVE_VOTE:
            delete newState[action.vote.id];
            return newState;
        default:
            return state;
    }
}

export default votesReducer;