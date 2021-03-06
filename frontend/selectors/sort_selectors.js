export const sortByNewest = posts => {
    return posts.sort((a,b) => new Date(b.createdAt) < new Date(a.createdAt) ? -1 : 1); 
}

export const sortByUpvotes = posts => {
    return posts.sort((a,b) => a.voteCount > b.voteCount ? -1 : 1); 
}

export const sortByQuestionCount = tags => {
    return tags.sort((a,b) => a.questionCount - b.questionCount < 0 ? 1 : -1); 
}

export const sortByName = tags => {
    return tags.sort((a,b) => a.name < b.name ? -1 : 1); 
}

export const sortByReputation = users => {
    return users.sort((a,b) => a.reputation < b.reputation ? 1 : -1); 
}