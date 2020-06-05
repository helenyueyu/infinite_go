import * as taggableAPIUtil from '../util/taggables_api_util';

export const RECEIVE_TAGGABLE = 'RECEIVE_TAGGABLE';
export const REMOVE_TAGGABLE = 'REMOVE_TAGGABLE'; 

const receiveTaggable = taggable => ({
    type: RECEIVE_TAGGABLE,
    taggable
})

const removeTaggable = taggable => ({
    type: REMOVE_TAGGABLE,
    taggable
})


export const createTaggable = taggable => dispatch => (
    taggableAPIUtil.createTaggable(taggable)
        .then(taggable => dispatch(receiveTaggable(taggable)))
)
export const deleteTaggable = id => dispatch => {
    return taggableAPIUtil.deleteTaggable(id)
        .then(taggable => {
            dispatch(removeTaggable(taggable));
        })
}