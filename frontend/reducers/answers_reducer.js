import { RECEIVE_ANSWERS, RECEIVE_ANSWER, REMOVE_ANSWER } from '../actions/answers_actions'; 

const answersReducer = (state = {}, action) => {
    Object.freeze(state); 

    let newState = Object.assign({}, state); 

    switch(action.type) {
        case RECEIVE_ANSWERS: 
            // debugger; 
            return action.answers; 
        case RECEIVE_ANSWER: 
            newState[action.answer.id] = action.answer; 
            return newState; 
        case REMOVE_ANSWER: 
            delete newState[action.answer.id]
            return newState; 
        default: 
            return state; 
    }
}

export default answersReducer; 