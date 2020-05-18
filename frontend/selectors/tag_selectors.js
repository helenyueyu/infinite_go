export const convertToArray = (hash) => {
    let arr = []; 
    for (let key in hash) {
        arr.push({name: key, count: hash[key]})
    }
    return arr; 
}