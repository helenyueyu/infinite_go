import React from 'react'; 
import { Link } from 'react-router-dom'; 

import ProfileImage from './profile_image'; 
import ProfileStats from './profile_stats'; 

import { sortByUpvotes } from '../../../selectors/sort_selectors'; 
import { filterByType } from '../../../selectors/filter_selectors'; 

import { displayShortenedDate } from '../../../selectors/date_selectors'; 

class Profile extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            posts: null 
        }
    }
    componentDidMount() {
        this.props.fetchUser(this.props.match.params.userId)
            .then(() => this.setState({
                posts: this.props.users[this.props.match.params.userId].posts 
            }))
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.userId !== this.props.match.params.userId) {
            this.props.fetchUser(this.props.match.params.userId)
        }
    }

    renderQuestionHeader(n) {
        return n === 1 ? `${n} Question` : `${n} Questions`; 
    }

    filter(e, type) {
        e.preventDefault(); 
        this.setState({
            posts: filterByType(this.state.posts, type)
        })
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
        
        // let { posts } = this.state; 
        // if (!posts) return null; 
        console.log(this.state)

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
                    <ProfileStats id={id}
                            createdAt={createdAt}
                            questionCount={questionCount}
                            answerCount={answerCount}
                            viewCount={viewCount}
                            numberOfPeopleReached={numberOfPeopleReached}
                            location={location}
                            lastSeenAt={lastSeenAt}
                            matchUrl={this.props.match.url.toString()}/>
                
                </div>

                <div className="profile_middle">
                    <div className="profile_middle-head">
                        <h1 className="profile_middle-header">Top Posts <span className="profile_middle-header-count">({questionCount + answerCount})</span></h1>
                        <div className="profile_middle-head-buttons">
                            <div className="profile_middle-head-buttons-group">
                                <button className="profile_middle-head-button">All</button>
                                <button onClick={(e) => this.filter(e, 'question')} className="profile_middle-head-button">Questions</button>
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
