import * as tagAPIUtil from '../util/tags_api_util';

export const RECEIVE_TAGS = 'RECEIVE_TAGS'; 
export const RECEIVE_TAG = 'RECEIVE_TAG';
export const REMOVE_TAG = 'REMOVE_TAG'; 

const receiveTags = tags => ({
    type: RECEIVE_TAGS, 
    tags 
})

const receiveTag = tag => ({
    type: RECEIVE_TAG,
    tag
})

const removeTag = tag => ({
    type: REMOVE_TAG, 
    tag 
})

export const fetchTags = () => dispatch => {
    return tagAPIUtil.fetchTags()
                .then(tags => {
                    const tagsDestructured = tags['tags']; 
                    dispatch(receiveTags(tagsDestructured)); 
                })
}

export const createTag = tag => dispatch => (
    tagAPIUtil.createTag(tag)
        .then(tag => dispatch(receiveTag(tag)))
)

export const deleteTag = id => dispatch => {
    return tagAPIUtil.deleteTag(id)
            .then(tag => {
                dispatch(removeTag(tag));
            })
}
