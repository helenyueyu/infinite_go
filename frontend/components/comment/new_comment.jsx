import React from 'react'; 

class NewComment extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            user_id: this.props.user_id, 
            commentable_id: this.props.commentable_id, 
            commentable_type: this.props.commentable_type, 
            body: "" 
        }

        this.handleChange = this.handleChange.bind(this); 
        this.handleSubmit = this.handleSubmit.bind(this); 
    }

    handleChange(e) {
        this.setState({
            body: e.target.value 
        })
    }

    handleSubmit(e) {
        e.preventDefault(); 
        this.props.createComment(this.state); 
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>Add Comment: 
                    <input onChange={this.handleChange} />
                </label>
                <button type="submit">Submit</button>
            </form>
        )
    }
}

export default NewComment; 
