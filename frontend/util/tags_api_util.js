export const createTag = tag => {
    return $.ajax({
        method: 'POST',
        url: '/api/tags',
        data: { tag }
    })
}