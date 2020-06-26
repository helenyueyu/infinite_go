import React from 'react'; 

const BadgesInfoItem = ({medal, description}) => (
    <div className={`badges_index-${medal}`}>
        <div className="badges_index-item-name"> 
            <div className={`badges_index-${medal}-coin`}>
                &#x25cf;
            </div>
            <div className="badges_index-item-name-name">
                {medal.slice(0, 1).toUpperCase() + medal.slice(1)} Badge
            </div>
        </div>
        <div className="badges_index-item-description-sidebar">
            {description}
        </div>
    </div>
)

export default BadgesInfoItem; 