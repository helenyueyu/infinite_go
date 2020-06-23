import React from 'react'; 

const TagStats = ({tagStats}) => (
    <div>
        {tagStats.map((tagStat, idx) => 
            <div key={idx}>
                <div>
                    {tagStat.name}
                </div>
                <div>
                    {tagStat.frequency}
                </div>
            </div>
        )}
    </div>
)

export default TagStats; 
