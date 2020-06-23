export const displayQuestion = (question, limit) => {
    if (question.length <= limit) return question; 
    if (!question.includes(" ")) return question; 
    if (question[limit] === ' ') {
        return question.slice(0, limit) + ' ...'; 
    } else {
        let i = limit; 
        while (question[i] !== ' ') {
            i--; 
        }
        return question.slice(0, i) + ' ...'; 
    }
}

export const nameExtensionURL = (title) => {
    let cleanedTitle = ""; 
    let alpha = 'abcdefghijklmnopqrstuvwxyz'; 
    for (let i = 0; i < title.length; i++) {
        if (title[i] === " ") {
            cleanedTitle += "-"; 
        } else if (alpha.includes(title[i].toLowerCase())) {
            cleanedTitle += title[i].toLowerCase(); 
        } else {
            if (cleanedTitle[cleanedTitle.length-1] === '-') {
                cleanedTitle += ''; 
            } else {
                cleanedTitle += '-'; 
            }
        } 
    }
    while (cleanedTitle[cleanedTitle.length-1] === '-') {
        cleanedTitle = cleanedTitle.slice(0, cleanedTitle.length-1); 
    }
    return cleanedTitle; 
}

export const isQuestionWatched = (questionTagIds, watchedTags) => {
    for (let i = 0; i < questionTagIds.length; i++) {
        if (watchedTags[questionTagIds[i]] !== undefined) {
            return true; 
        }
    }
    return false; 
}

export const removeSpaces = str => {
    let res = ""; 
    for (let i = 0; i < str.length; i++) {
        if (str[i] === ' ') continue; 
        res += str[i]; 
    }
    return res; 
}

