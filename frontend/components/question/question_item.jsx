import React from 'react'; 
import { Link } from 'react-router-dom'; 

import { displayDate } from '../../selectors/date_selectors'; 
import TagsContainer from '../tag/tags_container'; 
import ProfileSnippet from '../user/profile/profile_snippet'; 
import { Editor, EditorState, convertFromRaw, ContentBlock } from "draft-js"; 

class QuestionItem extends React.Component {
    renderQuestionSnippet(body) {
      let x = JSON.parse(body).blocks; 
      console.log(x); 
      // console.log(y); 
      // return x; 
    }

    render() {
        let {id, title, body, user, question, tags} = this.props; 
        this.renderQuestionSnippet(body); 

        // console.log("JSON.parse", convertFromRaw(JSON.parse(body))); 

        // const contentBlock = {
        //   blocks: JSON.parse(body), 
        //   entityMap: {} 
        // }
        // const currentContent = EditorState.createWithContent(
        //   convertFromRaw(contentBlock)
        // ); 

        // console.log("text:", contentBlock); 
        // const currentContent = EditorState.createWithContent(
        //   convertFromRaw(JSON.parse(body))
        // ); 
        // console.log(body); 
        // console.log(JSON.parse(body)); 
        return (
          <div className="question_item">
            <div className="question_item-title-div">
              <Link to={`/questions/${id}`} className="question_item-title">
                {title}
              </Link>
            </div>
            <div className="question_item-body">
              {/* {this.renderQuestionSnippet(body)} */}
              {/* <Editor editorState={currentContent} readOnly={true} /> */}
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