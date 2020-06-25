export const generatePageNumbers = (numQuestions, perPage, pageNumber) => {
    numQuestions = parseInt(numQuestions); 
    perPage = parseInt(perPage); 
    pageNumber = parseInt(pageNumber); 

    let breakPoint1 = null; 
    let breakPoint2 = null; 

    let max = Math.floor(numQuestions/perPage) + 1; 
    if (max <= 8) {
        const temp = []; 
        for (let i = 1; i <= max; i++) {
            temp.push(i); 
        }
        return [temp, null, null]; 
    }

    if (pageNumber >= 1 && pageNumber <= 4) {
        const arr = []; 
        for (let i = 1; i <= 4; i++) {
            arr.push(i); 
        }
        arr.push(5); 
        arr.push(max); 
        breakPoint1 = 5; 

        return [arr, breakPoint1, breakPoint2]; 
    } else if (pageNumber >= max-3 && pageNumber <= max) {
        const arr = []; 
        arr.push(1); 
        for (let i = max-4; i <= max; i++) {
            arr.push(i); 
        }
        breakPoint1 = 1; 
        return [arr, breakPoint1, breakPoint2]; 
    } else {
        const arr = []; 
        arr.push(1); 
        for (let i = pageNumber-2; i <= pageNumber+2; i++) {
            arr.push(i); 
        }
        arr.push(max); 
        breakPoint1 = 1; 
        breakPoint2 = pageNumber+2; 
        return [arr, breakPoint1, breakPoint2]; 
    }      
}