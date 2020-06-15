export const filterByType = (posts, type) => {
    return posts.filter(post => post.postType === type);
}