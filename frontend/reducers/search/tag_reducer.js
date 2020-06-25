import { CHANGE_TAG_PAGE_NUMBER, CHANGE_TAG_FILTER } from '../../actions/tag_search_actions';

const tagReducer = (state = {pageLimit: 36, pageNumber: 1, filter: 'popular'}, action) => {
    Object.freeze(state); 

    let newState = Object.assign({}, state);

    switch (action.type) {
        case CHANGE_TAG_PAGE_NUMBER: 
            newState['pageNumber'] = action.pageNumber; 
            return newState; 
        case CHANGE_TAG_FILTER: 
            newState['filter'] = action.filter; 
            return newState; 
        default: 
            return state; 
    }
}

export default tagReducer; 