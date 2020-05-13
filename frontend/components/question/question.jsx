import React from 'react'; 
import { Link } from 'react-router-dom'; 

class Question extends React.Component {
    constructor(props) {
        super(props); 
        this.handleDelete = this.handleDelete.bind(this); 
    }

    componentDidMount() {
        this.props.fetchQuestion(this.props.match.params.questionId)
    }

    handleDelete() {
        this.props.deleteQuestion(this.props.match.params.questionId)
            .then(() => this.props.history.push('/questions'))
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
                <div>{currentUser.id === user.id ? <button onClick={this.handleDelete}>delete</button> : null}</div>
                <div>{currentUser.id === user.id ? <Link to={`/questions/${id}/edit`}>Edit</Link> : null}</div>
            </div>
        )
    }
}

export default Question; 