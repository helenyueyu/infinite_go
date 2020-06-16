export const fetchBadges = () => {
    return $.ajax({
        method: 'GET',
        url: '/api/badges'
    })
}
export const createTag = badge => {
    return $.ajax({
        method: 'POST',
        url: '/api/badges',
        data: { badge }
    })
}
