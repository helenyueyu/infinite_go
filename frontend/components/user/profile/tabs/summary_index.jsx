import React from 'react'; 

import ProfileActivityContainer from '../profile_activity/profile_activity_container'; 

class SummaryIndex extends React.Component {
    render() {
        return (
            <div className="profile_activity_container">
                <ProfileActivityContainer />

                Summary Index 
            </div>
        )
    }
}

export default SummaryIndex; 