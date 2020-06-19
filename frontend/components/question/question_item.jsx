import React from 'react'; 
import { Link } from 'react-router-dom'; 

import { displayDate } from '../../selectors/date_selectors'; 
import { displayQuestion } from '../../selectors/display_selectors'; 

import TagsContainer from '../tag/tags_container'; 
import ProfileSnippet from '../user/profile/profile_snippet'; 
import { ContentBlock } from "draft-js"; 

class QuestionItem extends React.Component {
    renderQuestionSnippet(body) {
      return JSON.parse(body)
                  .blocks
                  .map(block => new ContentBlock(block))
                  .map(block => block.getText()).join(' '); 
    }

    render() {
        let {id, title, body, user, question, tags} = this.props; 
        return (
          <div className="question_item">
            <div className="question_item-title-div">
              <Link to={`/questions/${id}`} className="question_item-title">
                {title}
              </Link>
            </div>
            <div className="question_item-body">
              {displayQuestion(this.renderQuestionSnippet(body), 111)}
              ... 
            </div>

            <TagsContainer tags={tags} showDelete={false} />
            <div className="question_item-profile">
              <ProfileSnippet
                id={user.id}
                username={user.username}
                type="asked"
                reputation={user.reputation}
                medals={user.medals}
                timestamp={displayDate(question.createdAt)}
              />
            </div>
          </div>
        );
    }
}

export default QuestionItem; 