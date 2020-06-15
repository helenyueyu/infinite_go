import React from 'react'; 
import { Link } from 'react-router-dom'; 
import moment from 'moment'; 

import ProfileImage from './profile_image'; 

import { sortByUpvotes } from '../../../selectors/sort_selectors'; 
import { displayShortenedDate } from '../../../selectors/date_selectors'; 

class Profile extends React.Component {
    constructor(props) {
        super(props); 
    }
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
        
            
        posts = sortByUpvotes(posts).slice(0, 10)
        return (
            <div className="profile">
                <div>
                    <button className="profile-button">Profile</button>
                    <button className="profile-button">Activity</button>
                    <button className="profile-button">Developer Story</button>
                </div>

                <div className="profile_top">
                    <ProfileImage reputation={reputation} medals={medals}/>
                    
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
                                <div className="profile_top-stat-description">{numberOfPeopleReached === 1 ? 'person' : 'people'} reached</div>
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
                    <div className="profile_middle-head">
                        <h1 className="profile_middle-header">Top Posts <span className="profile_middle-header-count">({questionCount + answerCount})</span></h1>
                        <div className="profile_middle-head-buttons">
                            <div className="profile_middle-head-buttons-group">
                                <button className="profile_middle-head-button">All</button>
                                <button className="profile_middle-head-button">Questions</button>
                                <button className="profile_middle-head-button">Answers</button>
                            </div>
                            <div className="profile_middle-head-buttons-group">
                                <button className="profile_middle-head-button">Votes</button>
                                <button className="profile_middle-head-button">Newest</button>
                            </div>
                        
                        </div>
                    </div>
                    <div className="profile_middle-posts">
                        {posts.map((post, idx) => 
                            <div key={idx} className="profile_middle-post">
                                <div className="profile_middle-post-left">
                                    <div className={post.hasAcceptedAnswer === true ? "profile-middle-post-left-type" : "profile-middle-post-left-type-empty"}>
                                        {post.postType === 'answer' ? 'A' : 'Q'}
                                    </div>
                                    <div className={post.hasAcceptedAnswer === true ? "profile-middle-post-left-vote" : "profile-middle-post-left-vote-empty"}>
                                        {post.voteCount}
                                    </div>
                                    <Link to={`/questions/${post.id}`} className="profile-middle-post-left-title">{post.title}</Link>
                                </div>
                                

                                <div className="profile-middle-post-left-date">
                                    {displayShortenedDate(post.createdAt)}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                
            </div>
        )
    }
}

export default Profile; 
