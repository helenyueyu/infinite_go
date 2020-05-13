export const getQuestions = () => (
    $.ajax({
        method: 'GET',
        url: '/api/questions'
    })
)

export const getQuestion = (id) => (
    $.ajax({
        method: 'GET', 
        url: `/api/questions/${id}`
    })
)

export const createQuestion = question => {
    return $.ajax({
        method: 'POST', 
        url: '/api/questions', 
        data: { question }
    })
}

export const updateQuestion = question => {
    // debugger; 
    return $.ajax({
        method: 'PATCH', 
        url: `/api/questions/${question.id}`, 
        data: { question }
    })
}