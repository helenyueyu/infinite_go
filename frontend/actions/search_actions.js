export const CHANGE_PAGE_NUMBER = 'CHANGE_PAGE_NUMBER'; 
export const CHANGE_PAGE_LIMIT = 'CHANGE_PAGE_LIMIT'; 
export const RECEIVE_QUERY = 'RECEIVE_QUERY'; 

export const changePageNumber = pageNumber => ({
    type: CHANGE_PAGE_NUMBER,
    pageNumber
})

export const changePageLimit = pageLimit => {
    return {
    type: CHANGE_PAGE_LIMIT, 
    pageLimit
}}

export const receiveQuery = query => {
    return {
    type: RECEIVE_QUERY,
    query 
}}




