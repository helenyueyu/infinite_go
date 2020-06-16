export const sortByNewest = posts => {
    // debugger; 
    return posts.sort((a,b) => new Date(b.createdAt) < new Date(a.createdAt) ? -1 : 1); 
}

export const sortByUpvotes = posts => {
    return posts.sort((a,b) => a.voteCount > b.voteCount ? -1 : 1); 
}