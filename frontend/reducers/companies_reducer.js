import { RECEIVE_COMPANY } from '../actions/companies_actions';

const companiesReducer = (state = {}, action) => {
    Object.freeze(state);

    let newState = Object.assign({}, state);
    switch (action.type) {
        case RECEIVE_COMPANY:
            newState[action.company.id] = action.company; 
            return newState;  
        default:
            return state;
    }
}

export default companiesReducer;
