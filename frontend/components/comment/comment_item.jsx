import React from 'react'; 

import VoteContainer from '../vote/vote_container'; 
import { displayDate } from '../../selectors/date_selectors'; 


class CommentItem extends React.Component {
    render() {
        const { comment, handleDelete } = this.props; 
        return (
            <div className="comments-item">
                        
                <VoteContainer
                        voteable_id={comment.id}
                        voteable_type="Comment"
                        count={comment.voteCount}
                        action={this.props.fetchComments}
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
                        onClick={() => handleDelete(comment.id, comment.commentableId)}>
                            delete
                    </button>
                </div>
            </div>
        )
    }
}

export default CommentItem; 
