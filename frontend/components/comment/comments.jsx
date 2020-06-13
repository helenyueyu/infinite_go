import React from 'react'; 
import { displayDate } from '../../selectors/date_selectors'; 

class Comments extends React.Component {
    handleDelete(id, questionId) {
        this.props.deleteComment(id)
            .then(() => this.props.fetchComments(questionId))
            .then(() => this.props.fetchQuestion(questionId))
    }
    render() {
        let { comments } = this.props; 
        return (
            <div className="comments">
                {Object.values(comments).map((comment, idx) => 
                    <div key={idx} className="comments-item">
                        <span className="comments-body">{comment.body}</span>
                        <span className="comments-dash">&mdash;</span>
                        <span className="comments-username">{comment.username}</span>
                        <span className="comments-date">{displayDate(comment.createdAt)}</span>
                        <button 
                            className="comments-delete-button"
                            onClick={() => this.handleDelete(comment.id, comment.commentableId)}>
                                delete
                        </button>
                    </div>)}
            </div>
        )
    }
}
export default Comments; 