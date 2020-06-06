export const getMetas = () => {
    return $.ajax({
        method: 'GET',
        url: '/api/metas'
    })
}