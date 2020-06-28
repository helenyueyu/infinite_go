import React from 'react'; 
import { Link } from 'react-router-dom'; 

import ProfileButtons from '../../buttons/profile_buttons'; 
import ProfileImage from './profile_image'; 
import ProfileStats from './profile_stats'; 

import { sortByUpvotes, sortByNewest } from '../../../selectors/sort_selectors'; 
import { filterByType } from '../../../selectors/filter_selectors'; 

import { displayShortenedDate } from '../../../selectors/date_selectors'; 
import { nameExtensionURL } from '../../../selectors/display_selectors'; 

class Profile extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            posts: null, 
            tab1: true, 
            tab2: false, 
            tab3: false  
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
        let types = [['all', 'tab1'], ['question', 'tab2'], ['answer', 'tab3']]; 
        this.setState({
            posts: filterByType(this.props.users[this.props.match.params.userId].posts, type)
        })
        for (let i = 0; i < types.length; i++) {
            const [theType, tab] = types[i]; 
            if (theType === type) {
                this.setState({
                    [tab]: true 
                })
            } else {
                this.setState({
                    [tab]: false 
                })
            }
        }
    }

    sort(e, type) {
        e.preventDefault(); 
        if (type === 'upvotes') {
            this.setState({
                posts: sortByUpvotes(this.props.users[this.props.match.params.userId].posts)
            })
        }
        if (type === 'newest') {
            this.setState({
                posts: sortByNewest(this.props.users[this.props.match.params.userId].posts)
            })
        }
    }

    render() {
        if (this.props.users[this.props.match.params.userId] === undefined) {
            return null; 
        } 
        let { createdAt, 
                profilePhotoUrl, 
                username, 
                description,
                location, 
                reputation, 
                medals, 
                questionCount, 
                answerCount, 
                viewCount, 
                numberOfPeopleReached, 
                lastSeenAt, 
                id } = this.props.users[this.props.match.params.userId]; 
        
        let { posts } = this.state; 
        if (!posts) return null; 

        let shownPosts = sortByUpvotes(posts).slice(0, 10); 
   
        return (

            <div className="profile">
                <ProfileButtons id={id}
                        activeIdx={0} />

                <div className="profile_top">
                    <ProfileImage profilePhotoUrl={profilePhotoUrl}
                        reputation={reputation} 
                        medals={medals}/>
                    
                    <div className="profile_top-snippet">
                        <div className="profile_top-snippet-username">{username}</div>
                        <div>{description}</div>
                        <Link to={`/users/${id}/edit`}>edit</Link>
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
                        <h1 className="profile_middle-header">Top Posts <span className="profile_middle-header-count">({posts.length})</span></h1>
                        <div className="profile_middle-head-buttons">
                            <div className="profile_middle-head-buttons-group">

                                <button onClick={(e) => this.filter(e, 'all')}
                                    className={this.state.tab1 === true ? "profile_middle-head-button-active" : "profile_middle-head-button"}>All</button>
                                <button onClick={(e) => this.filter(e, 'question')} 
                                    className={this.state.tab2 === true ? "profile_middle-head-button-active" : "profile_middle-head-button"}>Questions</button>
                                <button onClick={(e) => this.filter(e, 'answer')}
                                    className={this.state.tab3 === true ? "profile_middle-head-button-active" : "profile_middle-head-button"}>Answers</button>
                            </div>
                            <div className="profile_middle-head-buttons-group">
                                <button onClick={(e) => this.sort(e, 'upvotes')}
                                        className="profile_middle-head-button">Votes</button>
                                <button onClick={(e) => this.sort(e, 'newest')}
                                        className="profile_middle-head-button">Newest</button>
                            </div>
                        
                        </div>
                    </div>
                    <div className="profile_middle-posts">
                        {shownPosts.map((post, idx) => 
                            <div key={idx} className="profile_middle-post">
                                <div className="profile_middle-post-left">
                                    <div className={post.hasAcceptedAnswer === true ? "profile-middle-post-left-type" : "profile-middle-post-left-type-empty"}>
                                        {post.postType === 'answer' ? 'A' : 'Q'}
                                    </div>
                                    <div className={post.hasAcceptedAnswer === true ? "profile-middle-post-left-vote" : "profile-middle-post-left-vote-empty"}>
                                        {post.voteCount}
                                    </div>
                                    <Link to={`/questions/${post.id}/${nameExtensionURL(post.title)}`} className="profile-middle-post-left-title">{post.title}</Link>
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
