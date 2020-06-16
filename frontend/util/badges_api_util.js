export const fetchBadges = () => {
    return $.ajax({
        method: 'GET',
        url: '/api/badges'
    })
}
