// 2020-06-13T20:33:01.057Z

const monthMap = {
    '01': 'Jan', 
    '02': 'Feb', 
    '03': 'Mar', 
    '04': 'Apr', 
    '05': 'May', 
    '06': 'Jun', 
    '07': 'Jul', 
    '08': 'Aug', 
    '09': 'Sept', 
    '10': 'Oct', 
    '11': 'Nov', 
    '12': 'Dec'
}

export const displayDate = (date) => {
    // if (isToday(date)) return "today"; 

    const chunks = date.split('-'); 
    chunks[2] = chunks[2].slice(0, 2); 

    const times = date.split(':'); 
    times[0] = times[0].slice(times[0].length-2, times[0].length); 
    times[2] = times[2].slice(0, 2); 

    const [hours, minutes, seconds] = times; 

    const [year, month, day] = chunks; 
    return `${monthMap[month]} ${day} '${year.slice(2)} at ${hours}:${minutes}`; 
}

export const displayShortenedDate = (date) => {
    if (isToday(date)) return "today"; 

    const chunks = date.split('-');
    chunks[2] = chunks[2].slice(0, 2); 
    const [year, month, day] = chunks;
    return `${monthMap[month]} ${day} '${year.slice(2)}`; 
}

const isToday = (date) => {
    const inputDate = new Date(date); 
    const today = new Date(); 

    if (inputDate.setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0)) {
        return true; 
    } else {
        return false; 
    }
}