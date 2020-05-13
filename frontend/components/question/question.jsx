import React from 'react'; 
import { Link } from 'react-router-dom'; 

class Question extends React.Component {
    componentDidMount() {
        this.props.fetchQuestion(this.props.match.params.questionId)
    }

    render() {
        if (!this.props.question) return null; 
        return (
            <div>
                {this.props.question.title}
                {this.props.question.body}
                <Link to="/questions">Back</Link>
            </div>
        )
    }
}

export default Question; 