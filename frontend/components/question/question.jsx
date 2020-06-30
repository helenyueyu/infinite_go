import React from 'react'; 
import moment from 'moment'; 

import { withRouter, Link } from 'react-router-dom'; 

import ProfileSnippet from '../user/profile/profile_snippet'; 
import DeleteButton from '../buttons/delete_button'; 
import EditButton from '../buttons/edit_button'; 

import CommentsContainer from '../comment/comments_container'; 

import VoteContainer from '../vote/vote_container'; 
import BookmarkContainer from '../bookmark/bookmark_container'; 

import TagsContainer from '../tag/tags_container'; 

import NewAnswerContainer from '../answer/new_answer_container'; 
import AnswersContainer from '../answer/answers_container'; 

import { nameExtensionURL, pluralize } from '../../selectors/display_selectors'; 
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
        let { id, title, body, user, createdAt, updatedAt, tags, voteCount, viewCount, 
            currentVote, currentBookmark } = question;
        if (!tags) return null; 

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
                    <button className="focus-button shadow">Ask Question</button>
                </Link>
            </div>

            <div className="question-info">
                {[["Asked", displayShortenedDate(createdAt)], 
                    ["Active", displayShortenedDate(updatedAt)], 
                    ["Viewed", pluralize(viewCount, "time")]].map((item, idx) => 
                    <div key={idx} className="question-info-item">
                        <span className="question-info-label">{item[0]}</span> 
                        <span className="question-info-value">{item[1]}</span> 
                    </div>
                )}
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
                  currentBookmark={currentBookmark}
                  action={this.props.fetchQuestion}
                />
              </div>
              

              <div className="question-right">
                    <div className="question-body">
                        <Editor editorState={currentContent} readOnly={true} />
                    </div>

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
                    profilePhotoUrl={user.profilePhotoUrl}
                    username={user.username}
                    type="asked"
                    reputation={user.reputation}
                    medals={user.medals}
                    timestamp={moment(createdAt).fromNow()}
                  />
                </div>

                <CommentsContainer 
                    question={question} />

              </div>
            </div>


            <AnswersContainer question={question} />
            <NewAnswerContainer question={question} />

          </div>
        );
    }
}

export default withRouter(Question); 