export const createTaggable = taggable => {
    return $.ajax({
        method: 'POST',
        url: '/api/taggables',
        data: { taggable }
    })
}
