export const getComments = questionId => {
    return $.ajax({
        method: 'GET',
        url: `/api/questions/${questionId}/comments`
    })
}

export const createComment = comment => {
    return $.ajax({
        method: 'POST', 
        url: '/api/comments', 
        data: { comment }
    })
}

export const deleteComment = id => {
    return $.ajax({
        method: 'DELETE',
        url: `/api/comments/${id}`    
    })
}