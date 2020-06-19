import * as bookmarkAPIUtil from "../util/bookmarks_api_util";

export const RECEIVE_BOOKMARK = "RECEIVE_TAG";

const receiveBookmark = bookmark => ({
  type: RECEIVE_BOOKMARK,
  bookmark
});

export const createBookmark = bookmark => dispatch =>
  bookmarkAPIUtil.createBookmark(bookmark).then(bookmark => dispatch(receiveBookmark(bookmark)));
