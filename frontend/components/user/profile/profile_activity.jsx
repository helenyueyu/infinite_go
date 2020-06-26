import React from 'react'; 

import { Link, withRouter } from 'react-router-dom'; 
import ProfileButtons from '../../buttons/profile_buttons'; 

class ProfileActivity extends React.Component {
    componentDidMount() {
        this.props.fetchUser(this.props.match.params.userId)
    }

    render() {
        let user = this.props.users[this.props.match.params.userId]; 
        if (user === undefined) {
            return null;
        } 

        let { id, medals } = user;  
        console.log("props", this.props); 
        return (
            <div className="profile_activity">
                <ProfileButtons id={id}
                        activeIdx={1} />
                        
                <div className="profile_activity-boxes">
                    <div className="profile_activity-box_1">
                        <div className="activity_box_title">Reputation</div>
                    </div>
                    <div className="profile_activity-box_2">
                        <div className="activity_box_title">Badges</div>
                        <div className="profile_top-medals">
                            {medals.map((medal, idx) =>
                                <div key={idx} className={idx === 0 ? "profile_top-medal-gold" : idx === 1 ? "profile_top-medal-silver" : "profile_top-medal-bronze"}>
                                    <div>
                                        &#x25cf;<span className="profile_top-medal-count">{medal}</span>
                                    </div>
                                </div>)}
                        </div>
                    </div>
                    <div className="profile_activity-box_3">
                        <div className="activity_box_title">Impact</div>
                    </div>
                </div>

                <div className="profile_activity-tabs">
                    <Link className="profile_activity-tab"
                        to={`/users/${user.id}/activity/bookmarks`}>
                        Bookmarks
                    </Link>
                    <Link className="profile_activity-tab"
                        to={`/users/${user.id}/activity/summary`}>
                        Summary
                    </Link>
                </div>
            </div>
        )
    }
}

export default withRouter(ProfileActivity); 