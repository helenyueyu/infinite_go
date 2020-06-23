import React from 'react'; 

const TagStats = ({tagStats}) => (
    <div>
        <h1 className="right_menu-title">Related Tags</h1>
        {tagStats.map((tagStat, idx) => 
            <div key={idx} className="tag_stats">
                <div className="tag_stats-item">
                    {tagStat.name}
                </div>
                <div className="tag_stats-freq">
                    x {tagStat.frequency}
                </div>
            </div>
        )}
    </div>
)

export default TagStats; 
