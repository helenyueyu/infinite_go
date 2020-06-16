import React from 'react'; 

import { Link } from 'react-router-dom'; 

const ProfileButtons = ({id}) => (
    <div>
        <button className="profile-button">
            <Link to={`/users/${id}`}>Profile</Link>
        </button>
        <button className="profile-button">
            <Link to={`/users/${id}/activity`}>Activity</Link>
        </button>
        <button className="profile-button">Developer Story</button>
    </div>
)

export default ProfileButtons; 