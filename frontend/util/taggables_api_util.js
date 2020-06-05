export const createTaggable = taggable => {
    return $.ajax({
        method: 'POST',
        url: '/api/taggables',
        data: { taggable }
    })
}


export const deleteTaggable = id => {
    return $.ajax({
        method: 'DELETE',
        url: `/api/taggables/${id}`
    })
}

