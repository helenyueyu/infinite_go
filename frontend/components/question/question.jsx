import React from 'react'; 
import { Link } from 'react-router-dom'; 

class Question extends React.Component {
    componentDidMount() {
        this.props.fetchQuestion(this.props.match.params.questionId)
    }

    render() {
        if (!this.props.question) return null; 

        let { currentUser } = this.props; 
        let { id, title, body, user } = this.props.question;
        return (
            <div>
                <div>{title}</div>
                <div>{body}</div>
                <div>{user.username}</div>
                <div><Link to="/questions">Back</Link></div>
                <div>{currentUser.id === user.id ? <Link to={`/questions/${id}/edit`}>Edit</Link> : null}</div>
            </div>
        )
    }
}

export default Question; 