export const CHANGE_QUESTION_PAGE_NUMBER = 'CHANGE_QUESTION_PAGE_NUMBER'; 
export const CHANGE_QUESTION_PAGE_LIMIT = 'CHANGE_QUESTION_PAGE_LIMIT'; 
export const RECEIVE_QUERY = 'RECEIVE_QUERY'; 

export const changeQuestionPageNumber = pageNumber => ({
    type: CHANGE_QUESTION_PAGE_NUMBER,
    pageNumber
})

export const changeQuestionPageLimit = pageLimit => {
    return {
    type: CHANGE_QUESTION_PAGE_LIMIT, 
    pageLimit
}}

export const receiveQuery = query => {
    return {
    type: RECEIVE_QUERY,
    query 
}}




