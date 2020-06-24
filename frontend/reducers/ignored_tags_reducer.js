import { RECEIVE_IGNORED_TAGS, RECEIVE_IGNORED_TAG, REMOVE_IGNORED_TAG } from '../actions/tags_actions'; 

const ignoredTagsReducer = (state = {}, action) => {
    Object.freeze(state);

    let newState = Object.assign({}, state);

    switch (action.type) {
        case RECEIVE_IGNORED_TAGS: 
            return action.ignoredTags; 
        case RECEIVE_IGNORED_TAG:  
            newState[action.ignoredTag.id] = action.ignoredTag; 
            return newState; 
        case REMOVE_IGNORED_TAG: 
            delete newState[action.ignoredTag.tagId]; 
            return newState; 
        default:
            return state;
    }
}

export default ignoredTagsReducer;