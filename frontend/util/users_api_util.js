export const getUsers = () => {
    return $.ajax({
        method: 'GET',
        url: '/api/users'
    })
}

export const getUser = id => {
    return $.ajax({
        method: 'GET', 
        url: `/api/users/${id}`
    })
}

export const searchUsers = query => {
    return $.ajax({
        method: 'GET', 
        url: `/api/users/search`, 
        data: { search: {
            query: query 
        }}
    })
}

