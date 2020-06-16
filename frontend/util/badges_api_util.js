export const fetchBadges = () => {
    return $.ajax({
        method: 'GET',
        url: '/api/badges'
    })
}
export const createBadge = badge => {
    return $.ajax({
        method: 'POST',
        url: '/api/badges',
        data: { badge }
    })
}

export const deleteBadge = id => {
    return $.ajax({
        method: 'DELETE',
        url: `/api/badges/${id}`
    })
}