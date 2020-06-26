import React from 'react'; 
import moment from 'moment'; 

import { Link } from 'react-router-dom'; 

const ProfileStats = ({questionCount, answerCount, viewCount, numberOfPeopleReached, location, lastSeenAt, createdAt, id, matchUrl}) => {
    return (
        <div>
            <div className="profile_top-stats">
            <div className="profile_top-stat">
                <div className="profile_top-stat-number">{questionCount} </div>
                <div className="profile_top-stat-description">question{questionCount === 1 ? '' : 's'}</div>
            </div>
            <div className="profile_top-stat">
                <div className="profile_top-stat-number">{answerCount} </div>
                <div className="profile_top-stat-description">answer{answerCount === 1 ? '' : 's'} </div>
            </div>
            <div className="profile_top-stat">
                <div className="profile_top-stat-number">{numberOfPeopleReached} </div>
                <div className="profile_top-stat-description">{numberOfPeopleReached === 1 ? 'person' : 'people'} reached</div>
            </div>
        </div>

            <div className="profile-details">
                <div className="profile-detail">
                    <span className="profile-detail-icon"><i className="fas fa-map-marker"></i></span>
                    <span>{location}</span>
                </div>
                <div className="profile-detail">
                <span className="profile-detail-icon"><i className="fas fa-link"></i></span>
                <span>
                    <Link className="profile-detail-link"
                        to={`/users/${id}`}>
                        {matchUrl}
                    </Link>
                </span>
            </div>
            <div className="profile-detail">
                <span className="profile-detail-icon"><i className="fas fa-history"></i></span>
                <span>Member for {moment(createdAt).fromNow(true)}</span>
            </div>
            <div className="profile-detail">
                <span className="profile-detail-icon"><i className="fas fa-eye"></i></span>
                <span>{viewCount} profile view{viewCount === 1 ? '' : 's'}</span>
            </div>
            <div className="profile-detail">
                <span className="profile-detail-icon"><i className="fas fa-history"></i></span>
                <span>Last seen {moment(lastSeenAt).fromNow()}</span>
            </div>
            </div>
        </div>
    )
}

export default ProfileStats; 