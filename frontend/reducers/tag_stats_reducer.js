import { RECEIVE_TAG_STATS } from '../actions/metas_actions'; 

const tagStatsReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case  RECEIVE_TAG_STATS:  
            return action.tagStats; 
        default:
            return state;
    }
}

export default tagStatsReducer;