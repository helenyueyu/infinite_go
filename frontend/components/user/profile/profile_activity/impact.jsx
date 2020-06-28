import React from 'react'; 

const Impact = ({numberOfPeopleReached}) => (
    <div className="profile_activity-box_3">
        <div className="activity_box_title">
            Impact
        </div>
        <div className="impact-top"> 
            <div className="impact-no-people">{numberOfPeopleReached}</div>
            <div>people reached</div>
        </div>
        <div className="impact-bottom">
            <div className="impact-bottom-item">
                <i className="fas fa-pencil-alt"></i>
                <div className="impact-bottom-item-edit">
                    10 posts edited
                </div>
            </div>
            <div className="impact-bottom-item">
                <i className="fas fa-flag"></i>
                <div>10 helpful flags</div>
            </div>
            <div className="impact-bottom-item">
                <i className="fas fa-sort-up impact"></i>
                <div>12 votes cast</div>
            </div>
        </div>
    </div>
)

export default Impact; 