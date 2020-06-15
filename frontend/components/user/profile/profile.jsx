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
        let { posts, 
                createdAt, 
                username, 
                location, 
                reputation, 
                medals, 
                questionCount, 
                answerCount, 
                viewCount, 
                numberOfPeopleReached, 
                lastSeenAt, 
                id } = this.props.users[this.props.match.params.userId]; 
        
        posts = posts.slice(0, 10)
        
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
                        <div className="profile-reputation">
                            <div className="profile-reputation-number">{reputation}</div>
                            <div className="profile-reputation-text">reputation</div>
                        </div>
                        <div className="profile_top-medals">
                            {medals.map((medal, idx) => 
                                <div key={idx} className={idx === 0 ? "profile_top-medal-gold" : idx === 1 ? "profile_top-medal-silver" : "profile_top-medal-bronze"}>
                                    &bull;<span className="profile_top-medal-count">{medal}</span>
                            </div>)}
                        </div>
                    </div>
                    
                    <div className="profile_top-snippet">
                        {username}
                    </div>
                    <div>
                        <div className="profile_top-stats">
                            <div className="profile_top-stat">
                                <div className="profile_top-stat-number">{questionCount} </div>
                                <div className="profile_top-stat-description">question{questionCount === 1 ? '' : 's'}</div>
                            </div>
                            <div className="profile_top-stat">
                                <div className="profile_top-stat-number">{answerCount} </div>
                                <div className="profile_top-stat-description">answer{answerCount === 1 ? '' : 's'} </div>
                            </div>
                            <div className="profile_top-stat">
                                <div className="profile_top-stat-number">{numberOfPeopleReached} </div>
                                <div className="profile_top-stat-description"> people reached</div>
                            </div>
                        </div>
                        
                        <div className="profile-details">
                            <div className="profile-detail">
                                <span className="profile-detail-icon"><i className="fas fa-map-marker"></i></span>
                                <span>{location}</span>
                            </div>
                            <div className="profile-detail">
                                <span className="profile-detail-icon"><i className="fas fa-link"></i></span>
                                <span>
                                    <Link className="profile-detail-link" 
                                        to={`/users/${id}`}>
                                            {this.props.match.url}
                                    </Link>
                                </span>
                            </div>
                            <div className="profile-detail">
                                <span className="profile-detail-icon"><i className="fas fa-history"></i></span>
                                <span>Member for {moment(createdAt).fromNow(true)}</span>
                            </div>
                            <div className="profile-detail">
                                <span className="profile-detail-icon"><i className="fas fa-eye"></i></span>
                                <span>{viewCount} profile view{viewCount === 1 ? '' : 's'}</span>
                            </div>
                            <div className="profile-detail">
                                <span className="profile-detail-icon"><i className="fas fa-history"></i></span>
                                <span>Last seen {moment(lastSeenAt).fromNow()}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="profile_middle">
                    <h1 className="profile_middle-header">Top Posts ({questionCount + answerCount})</h1>
                    <div className="profile_middle-posts">
                        {posts.map((post, idx) => 
                        <div key={idx}>
                            {post.title}
                        </div>
                        )}
                    </div>
                </div>
                
                <Link to="/questions">Back</Link>
            </div>
        )
    }
}

export default Profile; 
