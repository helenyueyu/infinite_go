import * as bookmarkAPIUtil from "../util/bookmarks_api_util";

export const RECEIVE_BOOKMARK = "RECEIVE_BOOKMARK";

const receiveBookmark = bookmark => ({
  type: RECEIVE_BOOKMARK,
  bookmark
});

export const createBookmark = bookmark => dispatch =>
  bookmarkAPIUtil.createBookmark(bookmark)
    .then(bookmark => {
        debugger; 
        dispatch(receiveBookmark(bookmark))
    });
