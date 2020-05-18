import * as tagAPIUtil from '../util/tags_api_util';

export const RECEIVE_TAG = 'RECEIVE_TAG';
export const REMOVE_TAG = 'REMOVE_TAG'; 

const receiveTag = tag => ({
    type: RECEIVE_TAG,
    tag
})

const removeTag = tag => ({
    type: REMOVE_TAG, 
    tag 
})

export const createTag = tag => dispatch => (
    tagAPIUtil.createTag(tag)
        .then(tag => dispatch(receiveTag(tag)))
)

export const deleteTag = id => dispatch => {
    // debugger; 
    return tagAPIUtil.deleteTag(id)
            .then(tag => {
                // debugger; 
                dispatch(removeTag(tag));
            })
}
