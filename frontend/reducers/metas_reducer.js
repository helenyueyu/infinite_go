import tagStatsReducer from './tag_stats_reducer'; 
import randomQuestionsReducer from './random_questions_reducer'; 

import { combineReducers } from 'redux';

const metasReducer = combineReducers({
    tagStats: tagStatsReducer, 
    randomQuestions: randomQuestionsReducer
})

export default metasReducer;