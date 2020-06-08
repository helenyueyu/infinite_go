import React from 'react';

class NewComment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: this.props.user_id,
            taggable_id: this.props.taggable_id,
            taggable_type: this.props.taggable_type,
            name: "", 
            errors: null 
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({
            name: e.target.value
        })
    }

    handleErrors(errorsArray) {
        this.setState({
            errors: errorsArray
        }); 
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
            .then(() => this.props.createTaggable(newTaggable), err => this.handleErrors(err.responseJSON))
            .then(() => this.props.fetchQuestion(this.state.taggable_id))
    }

    render() {
        const { errors } = this.state; 
        return (
            <form onSubmit={this.handleSubmit}>
                <label>Add Tag:
                    <input onChange={this.handleChange} />
                </label>
                <button type="submit">Submit</button>
                {errors ? errors.map((error, idx) => 
                    <li key={idx}>
                        {error}
                    </li>) 
                    : 
                null}
            </form>
        )
    }
}

export default NewComment; 