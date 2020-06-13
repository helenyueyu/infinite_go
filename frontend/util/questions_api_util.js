export const getQuestions = () => (
    $.ajax({
        method: 'GET',
        url: '/api/questions'
    })
)

export const getFilteredQuestions = (page, pageLimit, query) => {
    return $.ajax({
        method: 'GET', 
        url: `/api/questions/?page=${page}&page_limit=${pageLimit}&query=${query}`
    })
}

export const getRandomQuestions = () => {
    return $.ajax({
        method: 'GET', 
        url: '/api/questions/random'
    })
}

export const getQuestion = (id) => {
    return $.ajax({
        method: 'GET', 
        url: `/api/questions/${id}`
    })
}

export const createQuestion = question => {
    return $.ajax({
        method: 'POST', 
        url: '/api/questions', 
        data: { question }
    })
}

export const updateQuestion = question => {
    return $.ajax({
        method: 'PATCH', 
        url: `/api/questions/${question.id}`, 
        data: { question }
    })
}

export const deleteQuestion = id => {
    return $.ajax({
        method: 'DELETE', 
        url: `/api/questions/${id}`
    })
}