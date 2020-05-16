import React from 'react'; 

class EditAnswer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: this.props.userId,
            question_id: "", 
            id: "", 
            body: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.props.fetchQuestion(this.props.match.params.questionId)
            .then(() => {
                this.setState({
                    question_id: this.props.question.id 
                })
            })
        this.props.fetchAnswers(this.props.match.params.questionId)
            .then(() => {
                this.setState({
                    id: this.props.answer.id, 
                    body: this.props.answer.body 
                })
            })
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
            .then(() => this.props.history.push(`/questions/${this.state.question_id}`))
    }

    render() {
        if (!this.props.question || !this.props.answer) return null; 
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

export default EditAnswer; 