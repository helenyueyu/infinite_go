export const filterByType = (posts, type) => {
    return type==='all' ? posts : posts.filter(post => post.postType === type);
}