import React from 'react'; 

import { Link } from 'react-router-dom'; 

const ProfileButtons = ({id, activeIdx }) => {
    return (
        <div>
            
                <Link to={`/users/${id}`}>
                    <button className={activeIdx === 0 ? "profile-button-active" : "profile-button"}>
                        Profile
                    </button>
                </Link>
            
                <Link to={`/users/${id}/activity`}>
                    <button className={activeIdx === 1 ? "profile-button-active" : "profile-button"}>
                        Activity
                    </button>
                </Link>
            
            <button className="profile-button">Developer Story</button>
        </div>
    )
}

export default ProfileButtons; 