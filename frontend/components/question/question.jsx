import React from 'react'; 
import moment from 'moment'; 

import { withRouter, Link } from 'react-router-dom'; 

import ProfileSnippet from '../user/profile/profile_snippet'; 
import DeleteButton from '../buttons/delete_button'; 
import EditButton from '../buttons/edit_button'; 

import CommentsContainer from '../comment/comments_container'; 
import NewCommentContainer from '../comment/new_comment_container'; 

import VoteContainer from '../vote/vote_container'; 
import BookmarkContainer from '../bookmark/bookmark_container'; 

import TagsContainer from '../tag/tags_container'; 

import NewAnswerContainer from '../answer/new_answer_container'; 
import AnswersContainer from '../answer/answers_container'; 

import { nameExtensionURL } from '../../selectors/display_selectors'; 
import { displayShortenedDate } from '../../selectors/date_selectors'; 

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
        let { id, title, body, user, createdAt, updatedAt, comments, tags, voteCount, viewCount, currentVote } = question;
        if (!comments || !tags) return null; 

        const currentContent = EditorState.createWithContent(
          convertFromRaw(JSON.parse(body))
        );

        return (
          <div className="question">
            <div className="question-header">
                <div className="question-title">
                    {title}
                </div>
                <Link to="/questions/new">
                    <button className="question-create-question">Ask Question</button>
                </Link>
            </div>

            <div className="question-stats">
                <div className="question-stat">
                    <span className="question-stats-label">Asked</span> 
                    <span className="question-stats-value">{displayShortenedDate(createdAt)}</span>
                </div>
                <div className="question-stat">
                    <span className="question-stats-label">Active</span> 
                    <span className="question-stats-value">{displayShortenedDate(updatedAt)}</span>
                </div>
                <div className="question-stat">
                    <span className="question-stats-label">Viewed</span> 
                    <span className="question-stats-value">{viewCount} time{viewCount === 1 ? "" : "s"}</span>
                </div>
            </div>

            <div className="question-left">
              <div className="question-vote-bookmark">
                <VoteContainer
                  voteable_id={id}
                  voteable_type="Question"
                  count={voteCount}
                  action={this.props.fetchQuestion}
                  info={this.props.search}
                  currentVote={currentVote}
                />
                <BookmarkContainer 
                  bookmarkable_id={id}
                  bookmarkable_type="Question"
                />
              </div>
              

              <div className="question-right">
                <Editor editorState={currentContent} readOnly={true} />

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
                      link={`/questions/${id}/${nameExtensionURL(title)}/edit`}
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

                <div className="comments"> 
                    <CommentsContainer comments={Object.values(comments)} />

                    <NewCommentContainer
                    fetchQuestion={this.props.fetchQuestion}
                    commentable_id={question.id}
                    commentable_type="Question"
                    />
                </div>

              </div>
            </div>


            <AnswersContainer question={question} />
            <NewAnswerContainer question={question} />

          </div>
        );
    }
}

export default withRouter(Question); 