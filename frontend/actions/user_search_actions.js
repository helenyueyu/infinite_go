export const CHANGE_USER_PAGE_NUMBER = 'CHANGE_TAG_PAGE_NUMBER'; 
export const CHANGE_USER_FILTER = 'CHANGE_TAG_FILTER'; 

export const changeUserPageNumber = pageNumber => ({
    type: CHANGE_USER_PAGE_NUMBER,
    pageNumber
})

export const changeUserFilter = filter => ({
    type: CHANGE_USER_FILTER, 
    filter 
})
