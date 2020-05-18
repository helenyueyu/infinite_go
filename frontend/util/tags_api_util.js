
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

