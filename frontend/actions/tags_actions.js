import * as tagAPIUtil from '../util/tags_api_util';

export const RECEIVE_TAGS = 'RECEIVE_TAGS'; 
export const RECEIVE_TAG = 'RECEIVE_TAG';
export const REMOVE_TAG = 'REMOVE_TAG'; 
export const RECEIVE_WATCHED_TAGS = 'RECEIVE_WATCHED_TAGS'; 
export const RECEIVE_WATCHED_TAG = 'RECEIVE_WATCHED_TAG'; 
export const REMOVE_WATCHED_TAG = 'REMOVE_WATCHED_TAG'; 

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

const receiveWatchedTags = watchedTags => ({
    type: RECEIVE_WATCHED_TAGS, 
    watchedTags 
})

const receiveWatchedTag = watchedTag => ({
    type: RECEIVE_WATCHED_TAG, 
    watchedTag 
})

const removeWatchedTag = watchedTags => ({
    type: REMOVE_WATCHED_TAG, 
    watchedTags 
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

export const searchTags = query => dispatch => {
    return tagAPIUtil.searchTags(query)
        .then(tags => {
            dispatch(receiveTags(tags.tags))
        })
}

export const fetchWatchedTags = () => dispatch => {
    return tagAPIUtil.getWatchedTags()
        .then(watchedTags => {
            dispatch(receiveWatchedTags(watchedTags))
        })
}
export const createWatchedTag = watchTag => dispatch => {
    return tagAPIUtil.createWatchedTag(watchTag)
        .then(watchedTag => {
            dispatch(receiveWatchedTag(watchedTag))
        })
}

export const deleteWatchedTag = id => dispatch => {
    return tagAPIUtil.deleteWatchedTag(id)
        .then(watchedTag => {
            dispatch(removeWatchedTag(watchedTag))
        })
}

