import { combineReducers } from 'redux';
import currentUserReducer from './current_user_reducer';
import questionsReducer from './questions_reducer'; 

const entitiesReducer = combineReducers({
    currentUser: currentUserReducer, 
    questions: questionsReducer 
})

export default entitiesReducer; 