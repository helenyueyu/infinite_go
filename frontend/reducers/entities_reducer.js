import { combineReducers } from 'redux';
import currentUserReducer from './current_user_reducer';
import questionsReducer from './questions_reducer'; 
import searchReducer from './search/search_reducer';
import answersReducer from './answers_reducer'; 
import commentsReducer from './comments_reducer';  
import votesReducer from './votes_reducer'; 


const entitiesReducer = combineReducers({
    currentUser: currentUserReducer, 
    questions: questionsReducer, 
    answers: answersReducer, 
    votes: votesReducer, 
    comments: commentsReducer, 
    search: searchReducer
})

export default entitiesReducer; 