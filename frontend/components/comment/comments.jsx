import React from 'react'; 

import CommentItem from './comment_item'; 

class Comments extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            showCommentForm: false 
        }
        this.handleDelete = this.handleDelete.bind(this); 
        this.revealCommentForm = this.revealCommentForm.bind(this); 
    }

    componentDidMount() {
        this.props.fetchComments(this.props.question.id); 
    }

    handleDelete(id, questionId) {
        this.props.deleteComment(id)
            .then(() => this.props.fetchComments(questionId))
            .then(() => this.props.fetchQuestion(questionId))
    }

    revealCommentForm() {
        this.setState({
            showCommentForm: !this.state.showCommentForm 
        })
    }

    render() {
        let { comments, fetchComments } = this.props; 
        return (
            <div>
                {Object.values(comments).map((comment, idx) => 
                    <CommentItem key={idx}
                            comment={comment} 
                            handleDelete={this.handleDelete} 
                            fetchComments={fetchComments} />
                    )}
                
                
                <div className="new_comment">
                    <div className="new_comment-label" 
                        onClick={this.revealCommentForm}>
                        add a comment  
                    </div>
                </div> 
            </div>
        )
    }
}
export default Comments; 