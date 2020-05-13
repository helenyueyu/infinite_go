import React from 'react'; 

const Profile = ({logout}) => (
    <div>
        <h1>Profile Page</h1>
        <button onClick={logout}>logout</button>
    </div>
)

export default Profile; 
