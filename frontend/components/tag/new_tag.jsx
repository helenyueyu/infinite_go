import React from 'react';

class NewComment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: this.props.user_id,
            taggable_id: this.props.taggable_id,
            taggable_type: this.props.taggable_type,
            name: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({
            name: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        let newTag = {
            name: this.state.name, 
            user_id: this.state.user_id 
        }
        let newTaggable = {
            name: this.state.name, 
            taggable_id: this.state.taggable_id, 
            taggable_type: this.state.taggable_type 
        }
        this.props.createTag(newTag)
            .then(() => this.props.createTaggable(newTaggable))
            .then(() => this.props.fetchQuestion(this.state.taggable_id))
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>Add Tag:
                    <input onChange={this.handleChange} />
                </label>
                <button type="submit">Submit</button>
            </form>
        )
    }
}

export default NewComment; 