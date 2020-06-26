import React from 'react'; 

import VoteContainer from '../vote/vote_container'; 
import { displayDate } from '../../selectors/date_selectors'; 

import EditCommentContainer from './edit_comment_container'; 

class CommentItem extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            showEditForm: false, 
        }
        this.revealEditForm = this.revealEditForm.bind(this); 
    }

    componentDidUpdate(prevProps) {
        if (prevProps.comment.body !== this.props.comment.body) {
            this.setState({
                showEditForm: false 
            })
        }
    }

    revealEditForm() {
        this.setState({
            showEditForm: !this.state.showEditForm 
        })
    }

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
                    <EditCommentContainer id={comment.id}
                                        body={comment.body}
                                        commentable_id={comment.commentableId}
                                        commentable_type={comment.commentableType} 
                                        showEditForm={this.state.showEditForm} />
        
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

                    <button 
                        className="comments-edit-button"
                        onClick={this.revealEditForm}>
                            edit
                    </button>

                </div>
            </div>
        )
    }
}

export default CommentItem; 
