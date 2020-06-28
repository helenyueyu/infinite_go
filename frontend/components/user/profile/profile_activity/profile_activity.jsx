import React from 'react'; 

import { Link, withRouter } from 'react-router-dom'; 
import ProfileButtons from '../../../buttons/profile_buttons'; 

import Reputation from './reputation'; 
import Medals from './medals'; 
import Impact from './impact'; 

class ProfileActivity extends React.Component {
    componentDidMount() {
        this.props.fetchUser(this.props.match.params.userId)
    }

    render() {
        let user = this.props.users[this.props.match.params.userId]; 
        if (user === undefined) {
            return null;
        } 

        let { id, medals, numberOfPeopleReached } = user;  
        return (
            <div className="profile_activity">
                <ProfileButtons id={id}
                        activeIdx={1} />
                        
                <div className="profile_activity-boxes">
                    <Reputation />
                    <Medals medals={medals} />
                    <Impact numberOfPeopleReached={numberOfPeopleReached} />
                </div>

                <div className="profile_activity-tabs">
                    {["summary", "answers", "questions", "tags", "badges", "bookmarks", "bounties", "reputation"]
                    .map((tab, idx) => 
                    <Link key={idx}
                        className="profile_activity-tab"
                        to={`/users/${user.id}/activity/${tab}`}>
                        {tab[0].toUpperCase() + tab.slice(1)}
                    </Link>
                    )}
                    {/* <Link className="profile_activity-tab"
                        to={`/users/${user.id}/activity/summary`}>
                        Summary
                    </Link>
                    <Link className="profile_activity-tab"
                        to={`/users/${user.id}/activity/bookmarks`}>
                        Bookmarks
                    </Link> */}

                </div>
            </div>
        )
    }
}

export default withRouter(ProfileActivity); 