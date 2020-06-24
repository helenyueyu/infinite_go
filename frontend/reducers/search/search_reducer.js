import { combineReducers } from 'redux';

import questionReducer from './question_reducer'; 
import tagReducer from './tag_reducer'; 

const searchReducer = combineReducers({
    question: questionReducer,  
    tag: tagReducer 
})

export default searchReducer; 

// import { CHANGE_PAGE_LIMIT, CHANGE_PAGE_NUMBER, RECEIVE_QUERY } from '../../actions/search_actions';

// const searchReducer = (state = {query: "", pageLimit: 15, pageNumber: 1}, action) => {
//     Object.freeze(state); 

//     let newState = Object.assign({}, state);

//     switch (action.type) {
//         case RECEIVE_QUERY: 
//             newState['query'] = action.query; 
//             return newState; 
//         case CHANGE_PAGE_LIMIT: 
//             newState['pageLimit'] = action.pageLimit; 
//             return newState; 
//         case CHANGE_PAGE_NUMBER: 
//             newState['pageNumber'] = action.pageNumber; 
//             return newState; 
//         default: 
//             return state; 
//     }
// }

// export default searchReducer; 
