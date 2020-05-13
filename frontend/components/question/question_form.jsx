import React from 'react';
import { Link } from 'react-router-dom';

class QuestionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: this.props.userId,
            id: this.props.type === "new" ? "" : this.props.match.params.questionId,
            title: "",
            body: ""
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        if (this.props.type === "edit") {
            this.props.fetchQuestion(this.props.match.params.questionId)
                .then(() => this.setState({
                    title: this.props.question.title,
                    body: this.props.question.body
                }))
        }
    }

    handleChange(e, field) {
        e.preventDefault();
        this.setState({
            [field]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.action(this.state)
            .then(() => this.props.history.push(`/questions/${this.state.id}`));
    }

    render() {
        if (!this.props.question && this.props.type === "edit") return null;

        return (
            <div>
                <form onSubmit={this.handleSubmit}>

                    {["title", "body"].map(type =>
                        <label key={type}>{type}
                            <input
                                onChange={(e) => this.handleChange(e, type)}
                                value={this.state[type]} />
                        </label>
                    )}

                    <button type="submit">Submit</button>
                </form>
                <div><Link to={`/questions/${this.state.id}`}>Back</Link></div>
            </div>
        )
    }
}

export default QuestionForm; 