import { RECEIVE_COMPANY, RECEIVE_COMPANIES } from '../actions/companies_actions';

const companiesReducer = (state = {}, action) => {
    Object.freeze(state);

    let newState = Object.assign({}, state);
    switch (action.type) {
        case RECEIVE_COMPANIES: 
            return action.companies; 
        case RECEIVE_COMPANY:
            newState[action.company.id] = action.company; 
            return newState;  
        default:
            return state;
    }
}

export default companiesReducer;
