export const getTagStats = () => {
    return $.ajax({
        method: 'GET', 
        url: '/api/tags/popular'
    })
}

export const getStats = () => {
    return $.ajax({
        method: 'GET',
        url: '/api/metas'
    })
}