import React from 'react';

class AnswerForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.type === "new" ? "" : this.props.match.params.answerId, 
            user_id: this.props.userId,
            question_id: this.props.question.id, 
            body: "" 
        }; 

        this.handleChange = this.handleChange.bind(this); 
        this.handleSubmit = this.handleSubmit.bind(this);
    }

      componentDidMount() {
        console.log(this.props); 
        if (this.props.type === "edit") {
            this.props.fetchQuestion(this.props.match.params.questionId)
                .then(() => this.props.fetchAnswer(this.props.match.params.answerId))
                .then(() => this.setState({
                    question_id: this.props.question.id, 
                    body: this.props.answer.body 
                }))
        }
        // if (this.props.type === "edit") {
        //     this.props.fetchAnswer(id).then(() =>
        //         this.setState({
        //             user_id: this.props.question.title,
        //             question_id: 3, 
        //             body: "" 
        //         })
        //     );
        // }
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
        console.log(this.state); 

        return (
            <div className="answer_form">
                <form onSubmit={this.handleSubmit}>

                    <label>Your Answer 
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