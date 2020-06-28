import React from 'react'; 
import { Link } from 'react-router-dom'; 


const ProfileIndexItem = ({user}) => (
    <div className="profile_index-item">
        <div>
            <img className="profile_index-image" src={user.profilePhotoUrl} />
        </div>

        <div className="profile_index-item-detail">
            <Link className="profile_index-username" 
                    to={`/users/${user.id}`}>
                            {user.username}
            </Link>
            <div className="profile_index-location">{user.location}</div>
            <div className="profile_index-reputation">{user.reputation}</div>
            <div className="profile_index-tags">{user.topThreeTags.map((tag, idx) => 
                    <Link  key={idx}
                            className="profile_index-tag" 
                            to={`/questions/tagged/${tag}`}>{tag}{idx === user.topThreeTags.length-1 ? '' : ','}</Link>
                )}</div>
        </div>
    </div>
)

export default ProfileIndexItem; 
