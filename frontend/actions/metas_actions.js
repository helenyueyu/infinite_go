import * as metasAPIUtil from '../util/metas_api_util';

export const RECEIVE_TAG_STATS = 'RECEIVE_TAG_STATS';
export const RECEIVE_STATS = 'RECEIVE_STATS'; 

const receiveTagStats = tagStats => {
    return ({
        type: RECEIVE_TAG_STATS,
        tagStats
    })
}

const receiveStats = stats => {
    return ({
        type: RECEIVE_STATS, 
        stats 
    })
}

export const fetchTagStats = () => dispatch => {
    return metasAPIUtil.getTagStats()
        .then(tagStats => {
            dispatch(receiveTagStats(tagStats))
        })
}

export const fetchStats = () => dispatch => {
    return metasAPIUtil.getStats()
        .then(stats => {
            dispatch(receiveStats(stats))
        })
}