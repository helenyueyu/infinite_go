export const getUsers = () => {
    return $.ajax({
        method: 'GET',
        url: '/api/users'
    })
}

export const getPaginatedUsers = (page, pageLimit, filter) => {
    return $.ajax({
        method: 'GET', 
        url: `/api/users/?page=${page}&page_limit=${pageLimit}&filter=${filter}`
    })
}


export const getUser = id => {
    return $.ajax({
        method: 'GET', 
        url: `/api/users/${id}`
    })
}

// export const updateUser = user => {
//     return $.ajax({
//         method: 'PATCH', 
//         url: `/api/users/${user.id}`, 
//         data: { user }, 
//         contentType: false, 
//         processData: false 
//     })
// }

export const searchUsers = query => {
    return $.ajax({
        method: 'GET', 
        url: `/api/users/search`, 
        data: { search: {
            query: query 
        }}
    })
}

