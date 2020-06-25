export const CHANGE_TAG_PAGE_NUMBER = 'CHANGE_TAG_PAGE_NUMBER'; 
export const CHANGE_TAG_FILTER = 'CHANGE_TAG_FILTER'; 

export const changeTagPageNumber = pageNumber => ({
    type: CHANGE_TAG_PAGE_NUMBER,
    pageNumber
})

export const changeTagFilter = filter => ({
    type: CHANGE_TAG_FILTER, 
    filter 
})



