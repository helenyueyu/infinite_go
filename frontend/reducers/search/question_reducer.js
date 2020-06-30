import { CHANGE_QUESTION_PAGE_LIMIT, CHANGE_QUESTION_PAGE_NUMBER, RECEIVE_QUERY } from '../../actions/question_search_actions';

const defaultState = {
    query: "", 
    pageLimit: 15, 
    pageNumber: 1
}

const questionReducer = (state = defaultState, action) => {
    Object.freeze(state); 

    let newState = Object.assign({}, state);

    switch (action.type) {
        case RECEIVE_QUERY: 
            newState['query'] = action.query; 
            return newState; 
        case CHANGE_QUESTION_PAGE_LIMIT: 
            newState['pageLimit'] = action.pageLimit; 
            return newState; 
        case CHANGE_QUESTION_PAGE_NUMBER: 
            newState['pageNumber'] = action.pageNumber; 
            return newState; 
        default: 
            return state; 
    }
}

export default questionReducer; 