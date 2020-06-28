import React from 'react'; 

const Medals = ({medals}) => (
    <div className="profile_activity-box_2">
        <div className="activity_box_title">Badges</div>
        <div className="profile_top-medals">
            {medals.map((medal, idx) =>
                <div key={idx} className={idx === 0 ? "profile_top-medal-gold" : idx === 1 ? "profile_top-medal-silver" : "profile_top-medal-bronze"}>
                    <div>
                        &#x25cf;<span className="profile_top-medal-count">{medal}</span>
                    </div>
                </div>)}
        </div>
    </div>
); 

export default Medals; 