import { combineReducers } from 'redux';
import currentUserReducer from './current_user_reducer';
import questionsReducer from './questions_reducer'; 
import searchReducer from './search/search_reducer'; 

const entitiesReducer = combineReducers({
    currentUser: currentUserReducer, 
    questions: questionsReducer, 
    search: searchReducer  
})

export default entitiesReducer; 