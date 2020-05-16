import React from 'react'; 
import { Link } from 'react-router-dom'; 

import moment from 'moment'; 

import ProfileSnippet from '../user/profile/profile_snippet'; 
import DeleteButton from '../buttons/delete_button'; 
import EditButton from '../buttons/edit_button'; 

import NewAnswerContainer from '../answer/new_answer_container'; 
import AnswersContainer from '../answer/answers_container'; 

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

        let { currentUser, question } = this.props; 
        let { id, title, body, user, createdAt } = this.props.question;
        return (
            <div>
                <div className="question-title">{title}</div>
                <div>{body}</div>

                <div className="question-footer">
                    <div className="question-button-console">
                        <DeleteButton authorized={currentUser.id === user.id} handleDelete={this.handleDelete} />
                        <EditButton authorized={currentUser.id === user.id} link={`/questions/${id}/edit`} />
                    </div>
                    <ProfileSnippet username={user.username} timestamp={moment(createdAt).fromNow()} />
                </div>

                <NewAnswerContainer question={question} />
                <AnswersContainer question={question} />

                <Link to="/questions">Back</Link>
            </div>
        )
    }
}

export default Question; 