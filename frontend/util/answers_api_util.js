export const getAnswers = questionId => {
    return $.ajax({
        method: 'GET', 
        url: `/api/questions/${questionId}/answers`
    })
}

export const createAnswer = answer => {
    return $.ajax({
        method: 'POST',
        url: '/api/answers', 
        data: { answer }
    })
}

