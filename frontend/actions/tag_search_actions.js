export const CHANGE_TAG_PAGE_NUMBER = 'CHANGE_TAG_PAGE_NUMBER'; 
export const CHANGE_TAG_PAGE_LIMIT = 'CHANGE_TAG_PAGE_LIMIT'; 

export const changeTagPageNumber = pageNumber => ({
    type: CHANGE_TAG_PAGE_NUMBER,
    pageNumber
})

export const changeTagPageLimit = pageLimit => {
    return {
    type: CHANGE_TAG_PAGE_LIMIT, 
    pageLimit
}}

