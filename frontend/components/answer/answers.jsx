import React from 'react'; 
import { Link } from 'react-router-dom'; 

class Answers extends React.Component {
    componentDidMount() { 
        this.props.fetchAnswers(this.props.question.id)
    }

    handleDelete(id) {
        this.props.deleteAnswer(id); 
    }

    render() {
        if (!this.props.answers) return null; 
        const { answers, currentUser } = this.props; 
        return (
            <div>
                {answers.map((answer, idx) => <div key={idx}>
                        {answer.body}
                        {answer.user.username}
                        {currentUser.id === answer.user.id ? 
                            <button onClick={() => this.handleDelete(answer.id)}>Delete</button> : null}
                    </div>)}
            </div>
        )
    }
}

export default Answers; 

