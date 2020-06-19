import { RECEIVE_BOOKMARK } from '../actions/bookmarks_actions';

const bookmarksReducer = (state = {}, action) => {
    Object.freeze(state);

    let newState = Object.assign({}, state);

    switch (action.type) {
        case RECEIVE_BOOKMARK:
            newState[action.bookmark.id] = action.bookmark; 
            return newState;
        default:
            return state;
    }
}

export default bookmarksReducer;
