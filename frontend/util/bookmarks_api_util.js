export const getBookmarks = () => {
    return $.ajax({
        method: "GET", 
        url: "/api/bookmarks"
    })
}

export const createBookmark = bookmark => {
  return $.ajax({
    method: "POST",
    url: "/api/bookmarks",
    data: { bookmark }
  });
};
