export const displayQuestion = (question, limit) => {
    if (question[limit] === ' ') {
        return question.slice(0, limit); 
    } else {
        let i = limit; 
        while (question[i] !== ' ') {
            i--; 
        }
        return question.slice(0, i); 
    }
}

