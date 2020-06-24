import { RECEIVE_BOOKMARK, RECEIVE_BOOKMARKS } from '../actions/bookmarks_actions';

const bookmarksReducer = (state = {}, action) => {
    Object.freeze(state);

    let newState = Object.assign({}, state);
    switch (action.type) {
        case RECEIVE_BOOKMARKS: 
            return action.bookmarks; 
        case RECEIVE_BOOKMARK:
            newState[action.bookmark.id] = action.bookmark; 
            return newState;
        default:
            return state;
    }
}

export default bookmarksReducer;
