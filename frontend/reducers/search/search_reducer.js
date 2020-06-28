import { combineReducers } from 'redux';

import questionReducer from './question_reducer'; 
import tagReducer from './tag_reducer';
import userReducer from './user_reducer';  

const searchReducer = combineReducers({
    question: questionReducer,  
    tag: tagReducer, 
    user: userReducer 
})

export default searchReducer; 

