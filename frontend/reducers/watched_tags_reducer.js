import { RECEIVE_WATCH_TAG } from '../actions/tags_actions'; 

const watchedTagsReducer = (state = {}, action) => {
    Object.freeze(state);

    let newState = Object.assign({}, state);

    switch (action.type) {
        case  RECEIVE_WATCH_TAG:  
            newState[action.watchTag.id] = action.watchTag; 
            return newState; 
        default:
            return state;
    }
}

export default watchedTagsReducer;