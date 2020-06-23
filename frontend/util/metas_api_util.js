export const getTagStats = () => {
    return $.ajax({
        method: 'GET', 
        url: '/api/tags/popular'
    })
}