import React from 'react'; 
import { Link } from 'react-router-dom'; 
import moment from 'moment'; 


class Profile extends React.Component {
    componentDidMount() {
        this.props.fetchUser(this.props.match.params.userId)
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.userId !== this.props.match.params.userId) {
            this.props.fetchUser(this.props.match.params.userId)
        }
    }

    renderQuestionHeader(n) {
        return n === 1 ? `${n} Question` : `${n} Questions`; 
    }

    render() {
        if (this.props.users[this.props.match.params.userId] === undefined) {
            return null; 
        } 
        let { questions, createdAt, username, reputation, medals } = this.props.users[this.props.match.params.userId]; 
        
        return (
            <div className="profile">
                <div>
                    <button className="profile-button">Profile</button>
                    <button className="profile-button">Activity</button>
                    <button className="profile-button">Developer Story</button>
                </div>
                <div className="profile_top">
                    <div className="profile_top-image-container">
                        <img className="profile_top-image" src="/assets/favicon-512x512.png" />
                        <span>{reputation} reputation</span>
                        <div className="profile_top-medals">
                            {medals.map((medal, idx) => 
                                <div className={idx === 0 ? "profile_top-medal-gold" : idx === 1 ? "profile_top-medal-silver" : "profile_top-medal-bronze"}>
                                    &bull;<span className="profile_top-medal-count">{medal}</span>
                            </div>)}
                        </div>
                    </div>
                    
                    <div className="profile_top-snippet">
                        {username}
                    </div>
                    <div>
                        Member for {moment(createdAt).fromNow(true)}
                    </div>
                </div>

                <h1>Posts</h1>
                <h1>{this.renderQuestionHeader(questions.length)}</h1>
                <div>
                    {questions.map(question => question.title)}
                </div>
                <Link to="/questions">Back</Link>
            </div>
        )
    }
}

export default Profile; 
