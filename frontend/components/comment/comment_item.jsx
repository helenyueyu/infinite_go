import React from 'react'; 

import VoteContainer from '../vote/vote_container'; 
import { displayDate } from '../../selectors/date_selectors'; 

import EditCommentContainer from './edit_comment_container'; 

class CommentItem extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            showEditForm: false 
        }
        this.showEditForm = this.showEditForm.bind(this); 
    }

    showEditForm() {
        this.setState({
            showEditForm: !this.state.showEditForm
        })
    }

    render() {
        const { comment, handleDelete } = this.props; 
        const { showEditForm } = this.state; 
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
                    {showEditForm ? 
                        <EditCommentContainer id={comment.id} />
                        : <>
                        <span className="comments-body">{comment.body}</span>
                        <span className="comments-dash">&mdash;</span>
                        <span className="comments-username">{comment.username}</span>
                        <span className="comments-date">
                            {displayDate(comment.createdAt)}
                        </span>
                        </>}

                    <button 
                        className="comments-delete-button"
                        onClick={() => handleDelete(comment.id, comment.commentableId)}>
                            delete
                    </button>

                    <button 
                        className="comments-edit-button"
                        onClick={this.showEditForm}>
                            edit
                    </button>

                </div>
            </div>
        )
    }
}

export default CommentItem; 
