export const sortByNewest = questions => {
    return questions.sort((a,b) => b.createdAt < a.createdAt ? -1 : 1)
}