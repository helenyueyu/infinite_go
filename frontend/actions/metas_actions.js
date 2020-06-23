import * as metasAPIUtil from '../util/metas_api_util';

export const RECEIVE_TAG_STATS = 'RECEIVE_TAG_STATS';

const receiveTagStats = tagStats => {
    return ({
        type: RECEIVE_TAG_STATS,
        tagStats
    })
}

export const fetchTagStats = () => dispatch => {
    return metasAPIUtil.getTagStats()
        .then(tagStats => {
            dispatch(receiveTagStats(tagStats))
        })
}