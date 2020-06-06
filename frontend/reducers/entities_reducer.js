import { combineReducers } from 'redux';
import currentUserReducer from './current_user_reducer';
import usersReducer from './users_reducer'; 
import questionsReducer from './questions_reducer'; 
import searchReducer from './search/search_reducer';
import answersReducer from './answers_reducer'; 
import commentsReducer from './comments_reducer';  
import tagsReducer from './tags_reducer';  
import votesReducer from './votes_reducer'; 
import metasReducer from './metas_reducer'; 

const entitiesReducer = combineReducers({
    currentUser: currentUserReducer, 
    users: usersReducer, 
    questions: questionsReducer, 
    answers: answersReducer, 
    votes: votesReducer, 
    comments: commentsReducer, 
    tags: tagsReducer, 
    search: searchReducer, 
    metas: metasReducer 
})

export default entitiesReducer; 