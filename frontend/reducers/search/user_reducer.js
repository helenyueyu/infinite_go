import { CHANGE_USER_PAGE_NUMBER, CHANGE_USER_FILTER } from '../../actions/user_search_actions';

const userReducer = (state = {pageLimit: 36, pageNumber: 1, filter: 'reputation'}, action) => {
    Object.freeze(state); 

    let newState = Object.assign({}, state);

    switch (action.type) {
        case CHANGE_USER_PAGE_NUMBER: 
            newState['pageNumber'] = action.pageNumber; 
            return newState; 
        case CHANGE_USER_FILTER: 
            newState['filter'] = action.filter; 
            return newState; 
        default: 
            return state; 
    }
}

export default userReducer; 