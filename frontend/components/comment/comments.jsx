import React from 'react'; 
import VoteContainer from '../vote/vote_container'; 
import { displayDate } from '../../selectors/date_selectors'; 

class Comments extends React.Component {
    componentDidMount() {
        this.props.fetchComments(this.props.question.id); 
    }
    handleDelete(id, questionId) {
        this.props.deleteComment(id)
            .then(() => this.props.fetchComments(questionId))
            .then(() => this.props.fetchQuestion(questionId))
    }
    render() {
        let { comments } = this.props; 
        return (
            <div>
                {Object.values(comments).map((comment, idx) => 
                    <div key={idx} className="comments-item">
                        
                        <VoteContainer
                                voteable_id={comment.id}
                                voteable_type="Comment"
                                count={comment.voteCount}
                                action={this.props.fetchComments}
                                // info={questionId} 
                                type="comment"
                                currentVote={comment.currentVote}
                                />

                        <div className="comment-item">
                            <span className="comments-body">{comment.body}</span>
                            <span className="comments-dash">&mdash;</span>
                            <span className="comments-username">{comment.username}</span>
                            <span className="comments-date">
                                {displayDate(comment.createdAt)}
                            </span>
                            <button 
                                className="comments-delete-button"
                                onClick={() => this.handleDelete(comment.id, comment.commentableId)}>
                                    delete
                            </button>
                        </div>
                    </div>)}
            </div>
        )
    }
}
export default Comments; 