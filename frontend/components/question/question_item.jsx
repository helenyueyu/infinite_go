import React from 'react'; 
import { Link } from 'react-router-dom'; 

import { displayDate } from '../../selectors/date_selectors'; 
import TagsContainer from '../tag/tags_container'; 
import ProfileSnippet from '../user/profile/profile_snippet'; 

class QuestionItem extends React.Component {
    render() {
        let {id, title, body, user, question, tags, reputation, medals} = this.props; 
        return (
            <div className="question_item">
                <div className="question_item-title-div">
                    <Link to={`/questions/${id}`} className="question_item-title">{title}</Link>
                </div>
                <div className="question_item-body">{body}</div>

                <TagsContainer tags={tags} showDelete={false}/>
                <div className="question_item-profile">
                    <ProfileSnippet username={user.username}
                        reputation={user.reputation}
                        medals={user.medals}
                        timestamp={displayDate(question.createdAt)} />
                </div>
                
            </div>
        )
    }
}

export default QuestionItem; 