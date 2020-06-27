import React from 'react'; 

const BadgesIndexItem = ({ name, description, medalType, id, handleDelete }) => (
    <div className="badges_index-item">
        <div className="badges_index-item-name-container">
            <div className="badges_index-item-name">
                <div className={medalType === "gold"
                    ? "badges_index-gold-coin" :
                    medalType === "silver"
                        ? "badges_index-silver-coin" : "badges_index-bronze-coin"}>
                    &#x25cf;
                </div>
                <div className="badges_index-item-name-name">
                    {name}
                </div>
            </div>
        </div>

        <div className="badges_index-item-description">{description}</div>
        <div className="badges_index-item-awarded">0 awarded
        <button className="badges_index-item-delete" onClick={(e) => handleDelete(e, id)}>X</button>
        </div>
    </div>
)

export default BadgesIndexItem; 