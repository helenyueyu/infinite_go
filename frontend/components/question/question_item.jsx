import React from 'react'; 
import { Link } from 'react-router-dom'; 
import moment from 'moment'; 

class QuestionItem extends React.Component {
    render() {
        let {idx, id, title, body, user, question} = this.props; 
        return (
            <div className="question_item">
                <div className="question_item-title-div">
                    <Link to={`/questions/${id}`} className="question_item-title">{title}</Link>
                </div>
                <div className="question_item-body">{body}</div>
                <div>{user.username}</div>
                <div>{moment(question.createdAt).fromNow()}</div>
                <br />
            </div>
        )
    }
}

export default QuestionItem; 