import randomQuestionsReducer from './random_questions_reducer'; 
import tagStatsReducer from './tag_stats_reducer'; 
import statsReducer from './stats_reducer'; 

import { combineReducers } from 'redux';

const metasReducer = combineReducers({
    tagStats: tagStatsReducer, 
    stats: statsReducer, 
    randomQuestions: randomQuestionsReducer
})

export default metasReducer;