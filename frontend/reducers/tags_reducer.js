import { RECEIVE_TAG } from '../actions/tags_actions';

const tagsReducer = (state = {}, action) => {
    Object.freeze(state);

    let newState = Object.assign({}, state);

    switch (action.type) {
        case RECEIVE_TAG:
            newState[action.tag.id] = action.tag;
            return newState;
        default:
            return state;
    }
}

export default tagsReducer;