import React from 'react';

class AnswerForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: this.props.userId,
            question_id: this.props.question.id, 
            body: ""
        }

        this.handleChange = this.handleChange.bind(this); 
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        e.preventDefault();
        this.setState({
            body: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.action(this.state)
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>

                    <label>Body
                        <input
                            onChange={this.handleChange}
                            value={this.state.body} />
                    </label>

                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

export default AnswerForm; 