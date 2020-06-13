import statsReducer from './stats_reducer'; 
import randomQuestionsReducer from './random_questions_reducer'; 

import { combineReducers } from 'redux';

const metasReducer = combineReducers({
    stats: statsReducer, 
    randomQuestions: randomQuestionsReducer
})

export default metasReducer;