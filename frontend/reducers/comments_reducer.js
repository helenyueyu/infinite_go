import { RECEIVE_COMMENT } from '../actions/comments_actions';

const commentsReducer = (state = {}, action) => {
    Object.freeze(state);

    let newState = Object.assign({}, state);

    switch (action.type) {
        case RECEIVE_COMMENT:
            newState[action.comment.id] = action.comment;
            return newState;
        default:
            return state;
    }
}

export default commentsReducer;