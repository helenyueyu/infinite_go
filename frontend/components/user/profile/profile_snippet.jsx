import React from 'react'; 

import { Link } from 'react-router-dom'; 

const ProfileSnippet = ({username, timestamp, reputation, medals, type, id, color}) => {
    if (!medals) return null; 
    return (
        <div className={color === "transparent" ? "profile_snippet_transparent" : "profile_snippet"}>
            <div className="profile_snippet-date">{type} {timestamp}</div>

            <div className="profile_snippet-main">
                <img className="profile_snippet-pic" src="/assets/bug_mojo.png"></img>
                <div>
                    <Link className="profile_snippet-username-link" to={`/users/${id}`}>
                        <div className="profile_snippet-username">{username}</div>
                    </Link>
                    
                    <div className="profile_snippet-stats">
                        <div className="profile_snippet-stats-rep">{reputation}</div>
                        {medals.map((medal, idx) =>
                        <div className="profile_snippets-stats-medal" key={idx}>
                            <span className={idx === 0 ? "profile_snippet-stats-gold" : idx === 1 ? "profile_snippet-stats-silver" : "profile_snippet-stats-bronze"}>&bull;</span>
                            {medal}
                        </div>
                    )}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ProfileSnippet; 
