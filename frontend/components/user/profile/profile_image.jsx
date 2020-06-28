import React from 'react'; 

const ProfileImage = ({reputation, medals, profilePhotoUrl}) => (
    <div className="profile_top-image-container">
        <img className="profile_top-image" src={profilePhotoUrl} />

        <div className="profile-reputation">
            <div className="profile-reputation-number">{reputation}</div>
            <div className="profile-reputation-text">reputation</div>
        </div>
        <div className="profile_top-medals">
            {medals.map((medal, idx) =>
                <div key={idx} className={idx === 0 ? "profile_top-medal-gold" : idx === 1 ? "profile_top-medal-silver" : "profile_top-medal-bronze"}>
                    &#x25cf;<span className="profile_top-medal-count">{medal}</span>
                </div>)}
        </div>
    </div>
)

export default ProfileImage; 