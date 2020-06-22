import React from 'react'; 

class NewComment extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            user_id: this.props.user_id, 
            commentable_id: this.props.commentable_id, 
            commentable_type: this.props.commentable_type, 
            body: "", 
            showCommentForm: false 
        }

        this.showCommentForm = this.showCommentForm.bind(this); 
        this.handleChange = this.handleChange.bind(this); 
        this.handleSubmit = this.handleSubmit.bind(this); 
    }

    handleChange(e) {
        this.setState({
            body: e.target.value 
        })
    }

    showCommentForm() {
        this.setState({
            showCommentForm: !this.state.showCommentForm
        })
    }
    handleSubmit(e) {
        e.preventDefault(); 
        this.props.createComment(this.state)
            .then(() => this.props.fetchQuestion(this.state.commentable_id))
            .then(() => this.setState({
                body: "", 
                showCommentForm: false 
            }))
    }

    render() {
        const { showCommentForm } = this.state; 
        return (
            <div className="new_comment">
                <div className="new_comment-label" onClick={this.showCommentForm}>
                    add a comment  
                </div>
                { showCommentForm ? 
                    <form className="new_comment-form" onSubmit={this.handleSubmit}>
                        <input className="new_comment-input"
                            value={this.state.body} 
                            onChange={this.handleChange} />
                    </form> 
                    : 
                    null 
                } 
            </div>
        )
    }
}

export default NewComment; 
