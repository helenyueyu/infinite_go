import { RECEIVE_ANSWERS, RECEIVE_ANSWER } from '../actions/answers_actions'; 

const answersReducer = (state = {}, action) => {
    Object.freeze(state); 

    let newState = Object.assign({}, state); 

    switch(action.type) {
        case RECEIVE_ANSWERS: 
            return action.answers; 
        case RECEIVE_ANSWER: 
            newState[action.questionId] = action.answer; 
            return newState; 
        default: 
            return state; 
    }
}

export default answersReducer; 