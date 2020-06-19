export const displayQuestion = (question, limit) => {
    if (question[limit] === ' ' || question[limit-1] === ' ') {
        return question.slice(0, limit); 
    }
    console.log('thing here', question[limit]); 
    return question.slice(0, limit); 
}

