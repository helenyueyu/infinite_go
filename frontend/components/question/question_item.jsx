import React from 'react'; 
import { Link } from 'react-router-dom'; 

import moment from 'moment'; 

import ProfileSnippet from '../user/profile/profile_snippet'

class QuestionItem extends React.Component {
    render() {
        let {id, title, body, user, question} = this.props; 
        return (
            <div className="question_item">
                <div className="question_item-title-div">
                    <Link to={`/questions/${id}`} className="question_item-title">{title}</Link>
                </div>
                <div className="question_item-body">{body}</div>

                <ProfileSnippet username={user.username} timestamp={moment(question.createdAt).fromNow()} />
            </div>
        )
    }
}

export default QuestionItem; 