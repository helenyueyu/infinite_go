import { RECEIVE_TAG, REMOVE_TAG, RECEIVE_TAGS } from '../actions/tags_actions';

const tagsReducer = (state = {}, action) => {
    Object.freeze(state);

    let newState = Object.assign({}, state);
    // debugger; 
    switch (action.type) {
        case RECEIVE_TAGS: 
            return action.tags; 
        case RECEIVE_TAG:
            newState[action.tag.name] = action.tag;
            return newState;
        case REMOVE_TAG: 
            delete newState[action.tag.id]
            return newState; 
        default:
            return state;
    }
}

export default tagsReducer;

