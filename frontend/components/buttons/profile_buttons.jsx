import React from 'react'; 

import { Link } from 'react-router-dom'; 

const ProfileButtons = ({id, activeIdx }) => {
    return (
        <div>
            <button className={activeIdx === 0 ? "profile-button-active" : "profile-button"}>
                <Link to={`/users/${id}`}>Profile</Link>
            </button>
            <button className={activeIdx === 1 ? "profile-button-active" : "profile-button"}>
                <Link to={`/users/${id}/activity`}>Activity</Link>
            </button>
            <button className="profile-button">Developer Story</button>
        </div>
    )
}

export default ProfileButtons; 