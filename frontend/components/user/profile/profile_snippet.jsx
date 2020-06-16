import React from 'react'; 

const ProfileSnippet = ({username, timestamp, reputation, medals, type}) => {
    if (!medals) return null; 
    return (
        <div className="profile_snippet">
            <div className="profile_snippet-date">{type} {timestamp}</div>

            <div className="profile_snippet-main">
                <img className="profile_snippet-pic" src="/assets/favicon-512x512.png"></img>
                <div>
                    <div className="profile_snippet-username">{username}</div>
                    <div className="profile_snippet-stats">
                        <div className="profile_snippet-stats-rep">{reputation}</div>
                        {medals.map((medal, idx) =>
                        <div key={idx}>
                            <span className={idx === 0 ? "profile_snippet-stats-gold" : idx === 1 ? "profile_snippet-stats-silver" : "profile_snippet-stats-bronze"}>&bull;</span>{medal}
                        </div>
                    )}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ProfileSnippet; 
