import * as tagAPIUtil from '../util/tags_api_util';

export const RECEIVE_TAGS = 'RECEIVE_TAGS'; 
export const RECEIVE_TAG = 'RECEIVE_TAG';
export const REMOVE_TAG = 'REMOVE_TAG'; 
export const RECEIVE_WATCHED_TAGS = 'RECEIVE_WATCHED_TAGS'; 
export const RECEIVE_WATCHED_TAG = 'RECEIVE_WATCHED_TAG'; 
export const REMOVE_WATCHED_TAG = 'REMOVE_WATCHED_TAG'; 
export const RECEIVE_IGNORED_TAGS = 'RECEIVE_IGNORED_TAGS'; 
export const RECEIVE_IGNORED_TAG = 'RECEIVE_IGNORED_TAG'; 
export const REMOVE_IGNORED_TAG = 'REMOVE_IGNORED_TAG'; 
export const RECEIVE_TAG_DESCRIPTION = 'RECEIVE_TAG_DESCRIPTION'; 

const receiveTags = tags => ({
    type: RECEIVE_TAGS, 
    tags 
})

const receiveTagDescription = tag => {
    // debugger; 
    return {
    type: RECEIVE_TAG_DESCRIPTION, 
    tag 
}}

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

const removeWatchedTag = watchedTag => ({
    type: REMOVE_WATCHED_TAG, 
    watchedTag
})

const receiveIgnoredTags = ignoredTags => ({
    type: RECEIVE_IGNORED_TAGS, 
    ignoredTags 
})

const receiveIgnoredTag = ignoredTag => ({
    type: RECEIVE_IGNORED_TAG, 
    ignoredTag 
})

const removeIgnoredTag = ignoredTag => ({
    type: REMOVE_IGNORED_TAG, 
    ignoredTag
})

export const fetchTags = () => dispatch => {
    return tagAPIUtil.fetchTags()
                .then(tags => {
                    const tagsDestructured = tags['tags']; 
                    dispatch(receiveTags(tagsDestructured)); 
                })
}
// {tag_id, description}
export const updateTagDescription = (tag) => dispatch => {
    // debugger; 
    return tagAPIUtil.updateTagDescription(tag)
                .then(tag => {
                    // debugger; 
                    dispatch(receiveTagDescription(tag))
                })
}
export const fetchPaginatedTags = (pageNumber, pageLimit) => dispatch => {
    return tagAPIUtil.getPaginatedTags(pageNumber, pageLimit)
        .then(tags => {
            dispatch(receiveTags(tags)); 
        })
}

export const fetchFilteredQuestions = (pageNumber, pageLimit, query) => dispatch => {
    return questionAPIUtil.getFilteredQuestions(pageNumber, pageLimit, query)
        .then(questions => {
            dispatch(receiveAllQuestions(questions))
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
export const createWatchedTag = watchedTag => dispatch => {
    return tagAPIUtil.createWatchedTag(watchedTag)
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


export const fetchIgnoredTags = () => dispatch => {
    return tagAPIUtil.getIgnoredTags()
        .then(ignoredTags => {
            dispatch(receiveIgnoredTags(ignoredTags))
        })
}
export const createIgnoredTag = ignoredTag => dispatch => {
    return tagAPIUtil.createIgnoredTag(ignoredTag)
        .then(ignoredTag => {
            // debugger; 
            dispatch(receiveIgnoredTag(ignoredTag))
        })
}

export const deleteIgnoredTag = id => dispatch => {
    return tagAPIUtil.deleteIgnoredTag(id)
        .then(ignoredTag => {
            dispatch(removeIgnoredTag(ignoredTag))
        })
}

