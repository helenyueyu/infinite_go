export const createBookmark = bookmark => {
  // debugger; 
  return $.ajax({
    method: "POST",
    url: "/api/bookmarks",
    data: { bookmark }
  });
};
