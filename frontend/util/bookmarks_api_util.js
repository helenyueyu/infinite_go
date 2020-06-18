export const createBookmark = bookmark => {
  return $.ajax({
    method: "POST",
    url: "/api/bookmarks",
    data: { bookmark }
  });
};
