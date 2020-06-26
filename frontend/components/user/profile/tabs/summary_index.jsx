import React from 'react'; 

import ProfileActivityContainer from '../profile_activity_container'; 

class SummaryIndex extends React.Component {
    render() {
        return (
            <div className="profile_activity_container">
                <ProfileActivityContainer />

                <div className="summary_index">
                    This is the summary index 
                </div>
            </div>
        )
    }
}

export default SummaryIndex; 