import React from 'react'; 
import { Link } from 'react-router-dom'; 
import moment from 'moment'; 


class Profile extends React.Component {

    renderQuestionHeader(n) {
        return n === 1 ? `${n} Question` : `${n} Questions`
    }

    render() {
        if (!this.props.currentUser) return null; 
        let { questions, createdAt } = this.props.currentUser; 
        
        return (
            <div>
                <div>Member for {moment(createdAt).fromNow(true)}</div>
                <h1>{this.renderQuestionHeader(questions.length)}</h1>
                <div>
                    {questions.map(question => question.title)}
                </div>
                <Link to="/questions">Back</Link>
            </div>
        )
    }
}

export default Profile; 
