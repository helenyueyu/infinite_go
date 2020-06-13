import { RECEIVE_RANDOM_QUESTIONS } from '../actions/questions_actions';

const randomQuestionsReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_RANDOM_QUESTIONS:
            return action.questions;
        default:
            return state;
    }
}

export default randomQuestionsReducer;