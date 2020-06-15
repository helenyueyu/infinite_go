export const sortByNewest = questions => {
    return questions.sort((a,b) => b.createdAt < a.createdAt ? -1 : 1); 
}

export const sortByUpvotes = posts => {
    return posts.sort((a,b) => a.voteCount > b.voteCount ? -1 : 1); 
}