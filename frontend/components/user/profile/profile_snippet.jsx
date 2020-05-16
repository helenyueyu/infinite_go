import React from 'react'; 

const ProfileSnippet = ({username, timestamp}) => (
    <div>
        <div>{username}</div>
        <div>{timestamp}</div>
    </div>
)

export default ProfileSnippet; 
