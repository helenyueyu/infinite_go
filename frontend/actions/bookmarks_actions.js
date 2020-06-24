import * as bookmarkAPIUtil from "../util/bookmarks_api_util";

export const RECEIVE_BOOKMARK = "RECEIVE_BOOKMARK";
export const RECEIVE_BOOKMARKS = "RECEIVE_BOOKMARKS"; 

const receiveBookmarks = bookmarks => ({
    type: RECEIVE_BOOKMARKS, 
    bookmarks 
})

const receiveBookmark = bookmark => ({
  type: RECEIVE_BOOKMARK,
  bookmark
});

export const fetchBookmarks = () => dispatch => {
    bookmarkAPIUtil.getBookmarks()
        .then(bookmarks => {
            dispatch(receiveBookmarks(bookmarks))
        })
}

export const createBookmark = bookmark => dispatch =>
  bookmarkAPIUtil.createBookmark(bookmark)
    .then(bookmark => {
        dispatch(receiveBookmark(bookmark))
    });

