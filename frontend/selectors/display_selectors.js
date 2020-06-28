export const displayShortenedPost = (post, limit) => {
    if (post.length <= limit || !post.includes(" ")) return post; 
    if (post[limit] === ' ') {
        return post.slice(0, limit) + ' ...'; 
    } else {
        let i = limit; 
        while (post[i] !== ' ') {
            i--; 
        }
        return post.slice(0, i) + ' ...'; 
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

export const isQuestionIgnored = (questionTagIds, ignoredTags) => {
    for (let i = 0; i < questionTagIds.length; i++) {
        if (ignoredTags[questionTagIds[i]] !== undefined) {
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


export const rowify = (items, perRow) => {
    let arr = []; 
    for (let i = 0; i < items.length; i+= perRow) {
        let row = []; 
        for (let j = i; j < i + perRow; j++) {
            if (items[j]) row.push(items[j]); 
        }
        arr.push(row); 
    }
    return arr; 
}