import { CHANGE_TAG_PAGE_LIMIT, CHANGE_TAG_PAGE_NUMBER } from '../../actions/tag_search_actions';

const tagReducer = (state = {pageLimit: 36, pageNumber: 1}, action) => {
    Object.freeze(state); 

    let newState = Object.assign({}, state);

    switch (action.type) {
        case CHANGE_TAG_PAGE_LIMIT: 
            newState['pageLimit'] = action.pageLimit; 
            return newState; 
        case CHANGE_TAG_PAGE_NUMBER: 
            newState['pageNumber'] = action.pageNumber; 
            return newState; 
        default: 
            return state; 
    }
}

export default tagReducer; 