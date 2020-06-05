import * as taggableAPIUtil from '../util/taggables_api_util';

export const RECEIVE_TAGGABLE = 'RECEIVE_TAGGABLE';

const receiveTaggable = taggable => ({
    type: RECEIVE_TAGGABLE,
    taggable
})

export const createTaggable = taggable => dispatch => (
    taggableAPIUtil.createTaggable(taggable)
        .then(taggable => dispatch(receiveTaggable(taggable)))
)