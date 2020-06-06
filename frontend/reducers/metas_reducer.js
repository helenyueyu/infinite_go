import { RECEIVE_METAS } from '../actions/metas_actions';

const metasReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_METAS:
            return action.metas;
        default:
            return state;
    }
}

export default metasReducer;