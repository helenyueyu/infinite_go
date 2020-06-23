import { RECEIVE_WATCHED_TAG, RECEIVE_WATCHED_TAGS } from '../actions/tags_actions'; 

const watchedTagsReducer = (state = {}, action) => {
    Object.freeze(state);

    let newState = Object.assign({}, state);

    switch (action.type) {
        case RECEIVE_WATCHED_TAGS: 
            return action.watchedTags; 
        case  RECEIVE_WATCHED_TAG:  
            newState[action.watchedTag.id] = action.watchedTag; 
            return newState; 
        default:
            return state;
    }
}

export default watchedTagsReducer;