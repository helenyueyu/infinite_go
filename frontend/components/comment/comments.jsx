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
                {Object.values(comments).map((x, idx) => 
                    <div key={idx} className="comments-item">
                        <span className="comments-body">{x.body}</span>
                        <span className="comments-dash">&mdash;</span>
                        <span className="comments-username">{x.username}</span>
                        <span className="comments-date">{displayDate(x.createdAt)}</span>
                        <button onClick={() => this.handleDelete(x.id, x.commentableId)}>D</button>
                    </div>)}
            </div>
        )
    }
}
export default Comments; 