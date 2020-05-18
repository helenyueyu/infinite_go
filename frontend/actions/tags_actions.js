import * as tagAPIUtil from '../util/tags_api_util';

export const RECEIVE_TAG = 'RECEIVE_TAG';

export const createTag = tag => dispatch => (
    tagAPIUtil.createTag(tag)
        .then(tag => dispatch(receiveTag(tag)))
)

const receiveTag = tag => ({
    type: RECEIVE_TAG,
    tag
})