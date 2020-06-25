import { RECEIVE_STATS } from '../actions/metas_actions'; 

const statsReducer = (state = {}, action) => {
    Object.freeze(state);
    
    switch (action.type) {
        case  RECEIVE_STATS:  
            return action.stats; 
        default:
            return state;
    }
}

export default statsReducer;