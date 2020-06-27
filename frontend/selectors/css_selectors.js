export const computeBadgeClassName = (idx, activeIdx) => {
    let className = "badges_medal"; 
    if (idx === 0) className += " start"; 
    if (idx === 3) className += " end"; 
    if (idx === activeIdx) className += " active"; 
    return className; 
}
