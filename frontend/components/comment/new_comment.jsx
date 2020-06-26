import React from 'react'; 

class NewComment extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            id: this.props.type === "new" ? "" : this.props.id, 
            user_id: this.props.user_id, 
            commentable_id: this.props.commentable_id, 
            commentable_type: this.props.commentable_type, 
            body: this.props.type === "new" ? "" : this.props.body, 
            showCommentForm: this.props.showCommentForm, 
            showEditForm: this.props.showEditForm  
        }
        this.handleChange = this.handleChange.bind(this); 
        this.handleSubmit = this.handleSubmit.bind(this); 
    }

    componentDidUpdate(prevProps) {
        if (prevProps.showEditForm !== this.props.showEditForm) {
            this.setState({
                showEditForm: this.props.showEditForm 
            })
        }
        if (prevProps.showCommentForm !== this.props.showCommentForm) {
            this.setState({
                showCommentForm: this.props.showCommentForm
            })
        }
    }

    handleChange(e) {
        this.setState({
            body: e.target.value 
        })
    }
    
    handleSubmit(e) {
        e.preventDefault(); 
        this.props.action(this.state)
            .then(() => this.props.fetchQuestion(this.state.commentable_id))
            .then(() => this.setState({
                body: this.props.type === "new" ? "" : this.props.body, 
                showCommentForm: false, 
                showEditForm: false  
            }))
    }

    render() {
        const { type } = this.props; 
        const { showCommentForm, showEditForm } = this.state; 
        return (
            <>
                {type === "new" ? 
                <>
                    { showCommentForm ? 
                        <form className="new_comment-form" onSubmit={this.handleSubmit}>
                            <input className="new_comment-input"
                                value={this.state.body} 
                                onChange={this.handleChange} />
                        </form> 
                        : 
                        null 
                    } 
                </> : 
                <>
                    {showEditForm ? <form className="new_comment-form" onSubmit={this.handleSubmit}>
                        <input className="new_comment-input"
                            value={this.state.body} 
                            onChange={this.handleChange} />
                    </form>  : null}
                </>
                }
            </>
        )
    }
}

export default NewComment; 
