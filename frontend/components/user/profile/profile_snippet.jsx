import React from 'react'; 

const ProfileSnippet = ({username, timestamp}) => (
    <div>
        <div>{timestamp}</div>
        <div>{username}</div>
    </div>
)

export default ProfileSnippet; 
