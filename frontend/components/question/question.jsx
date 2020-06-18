import React from 'react'; 
import { Link } from 'react-router-dom'; 

import moment from 'moment'; 

import ProfileSnippet from '../user/profile/profile_snippet'; 
import DeleteButton from '../buttons/delete_button'; 
import EditButton from '../buttons/edit_button'; 

import CommentsContainer from '../comment/comments_container'; 
import NewCommentContainer from '../comment/new_comment_container'; 

import VoteContainer from '../vote/vote_container'; 

import TagsContainer from '../tag/tags_container'; 
import NewTagContainer from '../tag/new_tag_container'; 

import NewAnswerContainer from '../answer/new_answer_container'; 
import AnswersContainer from '../answer/answers_container'; 

import { Editor, EditorState, convertFromRaw } from 'draft-js'; 

class Question extends React.Component {
    constructor(props) {
        super(props); 
        this.handleDelete = this.handleDelete.bind(this); 
    }

    componentDidMount() {
        this.props.fetchQuestion(this.props.match.params.questionId); 
    }

    handleDelete() {
        this.props.deleteQuestion(this.props.match.params.questionId)
            .then(() => this.props.history.push('/questions'))
    }

    render() {
        if (!this.props.question) return null; 
        
        let { currentUser, question } = this.props; 
        let { id, title, body, user, createdAt, comments, tags, voteCount } = question;
        if (!comments || !tags) return null; 

        const currentContent = EditorState.createWithContent(
          convertFromRaw(JSON.parse(body))
        );

        // console.log("questionContent", currentContent); 

        return (
          <div className="question">
            <div className="question-info">
              <VoteContainer
                voteable_id={id}
                voteable_type="Question"
                count={voteCount}
                action={this.props.fetchQuestion}
                info={this.props.search}
              />

              <div>
                <div className="question-title">{title}</div>
                <Editor editorState={currentContent} readOnly={true} />

                {/* <div className="question-body">{body}</div> */}

                <NewTagContainer
                  fetchQuestion={this.props.fetchQuestion}
                  taggable_id={question.id}
                  taggable_type="Question"
                />

                <TagsContainer
                  fetchQuestion={this.props.fetchQuestion}
                  taggable_id={question.id}
                  tags={tags}
                  showDelete={true}
                />

                <div className="question-footer">
                  <div className="question-button-console">
                    <DeleteButton
                      authorized={currentUser.id === user.id}
                      handleDelete={this.handleDelete}
                    />
                    <EditButton
                      authorized={currentUser.id === user.id}
                      link={`/questions/${id}/edit`}
                    />
                  </div>
                  <ProfileSnippet
                    id={user.id}
                    username={user.username}
                    type="asked"
                    reputation={user.reputation}
                    medals={user.medals}
                    timestamp={moment(createdAt).fromNow()}
                  />
                </div>
              </div>
            </div>

            <CommentsContainer comments={Object.values(comments)} />

            <NewCommentContainer
              fetchQuestion={this.props.fetchQuestion}
              commentable_id={question.id}
              commentable_type="Question"
            />

            <AnswersContainer question={question} />
            <NewAnswerContainer question={question} />

            <Link to="/questions">Back</Link>
          </div>
        );
    }
}

export default Question; 