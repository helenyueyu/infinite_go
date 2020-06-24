export const fetchTags = () => {
    return $.ajax({
        method: 'GET', 
        url: '/api/tags'
    })
}

export const createTag = tag => {
    return $.ajax({
        method: 'POST',
        url: '/api/tags',
        data: { tag }
    })
}

export const deleteTag = id => {
    return $.ajax({
        method: 'DELETE', 
        url: `/api/tags/${id}`
    })
}

export const searchTags = query => {
    return $.ajax({
        method: 'GET',
        url: `/api/tags/search`,
        data: {
            search: {
                query: query
            }
        }
    })
}

export const getWatchedTags = () => {
    return $.ajax({
        method: 'GET', 
        url: '/api/watched_tags'
    })
}

export const createWatchedTag = watchedTag => {
    return $.ajax({
        method: 'POST', 
        url: '/api/watched_tags', 
        data: { 
            watched_tag: watchedTag 
        }
    })
}

export const deleteWatchedTag = id => {
    return $.ajax({
        method: 'DELETE', 
        url: `/api/watched_tags/${id}`
    })
}