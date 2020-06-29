import React from 'react'; 

import { Link } from 'react-router-dom'; 
import { isQuestionWatched, isQuestionIgnored } from '../../selectors/display_selectors'; 
import { generatePageNumbers } from '../../selectors/pagination_selectors'; 

import FilterQuestion from './filter_question'; 
import QuestionItem from './question_item'; 

class Questions extends React.Component {
    constructor(props) {
        super(props); 
        this.fetchQuestions = this.fetchQuestions.bind(this); 
        this.state = {
            questionCount: this.props.questionCount 
        }

    }

    componentDidMount() {
        let url = this.props.history.location.pathname;
        if (url.includes('tagged')) {
            let query = '[' + url.slice(url.lastIndexOf('/') + 1) + ']'; 
            dispatch({
                type: 'RECEIVE_QUERY', 
                query: query 
            })
        } else {
            this.fetchQuestions(this.props.search)
        }
    }

    componentDidUpdate(prevProps) {
        const oldTag = prevProps.match.params.tagName; 
        const currTag = this.props.match.params.tagName; 
        let url = this.props.history.location.pathname; 
        if (url.includes('tagged') && oldTag !== currTag) {
            let query = '[' + currTag + ']'; 
            dispatch({
                type: 'RECEIVE_QUERY', 
                query: query 
            })
        }
        if (this.newSearchParams(prevProps.search, this.props.search)) {
            this.fetchQuestions(this.props.search)
        }
    }

    fetchQuestions({pageNumber, pageLimit, query}) {
        this.props.fetchFilteredQuestions(pageNumber, pageLimit, query); 
    }

    newSearchParams(h1, h2) {
        return h1.pageNumber !== h2.pageNumber || 
            h1.pageLimit !== h2.pageLimit || 
            h1.query !== h2.query 
    }

    newTag(oldTag, currTag) {
        return oldTag !== currTag; 
    }

    render() {
        let { questions, search, questionCount, watchedTags, ignoredTags } = this.props; 
        if (!questions || !search || questions.length === 0) return null; 

        const [pages, bp1, bp2] = generatePageNumbers(questionCount, search.pageLimit, search.pageNumber); 
        if (questions.length > 0) {
            return (
                <div className="questions">
                    <div className="questions-header">
                        <div className="questions-title">
                            {questionCount} question{questionCount === 1 ? '' : 's'}
                        </div>
                        <Link to="/questions/new">
                            <button className="questions-create-question">Create Question</button>
                        </Link>
                    </div>
                    
                    
                    {questions.map((question, idx) => {
                        let {id, title, body, user, voteCount, 
                            viewCount, answerCount, tags, hasAcceptedAnswer } = question; 

                        const questionTagIds = tags.map(tag => tag.id); 

                        const isWatched = isQuestionWatched(questionTagIds, watchedTags); 
                        const isIgnored = isQuestionIgnored(questionTagIds, ignoredTags); 
                        return (
                            <div key={idx} 
                                className={isWatched && isIgnored ? "questions-item watched ignored" : 
                                            isWatched ? "questions-item watched" : 
                                            isIgnored ? "questions-item ignored" : 
                                            "questions-item"}>
                                <div className="questions-statistics">
                                    <div className="questions-statistics-votes">
                                        <div className="questions-stat">{voteCount}</div>
                                        <div className="questions-stat-count">vote{voteCount === 1 ? "" : "s"}</div>
                                    </div>

                                    <div className={answerCount === 0 ? "questions-statistics-answers" : (hasAcceptedAnswer ? "questions-statistics-answers-accepted": "questions-statistics-answers-greater")}>

                                    <div className="questions-stat">{answerCount}</div>
                                        <div className="questions-stat-count">answer{answerCount === 1 ? "" : "s"}</div>
                                    </div>
                                    <div className="questions-statistics-views">
                                        <div className="questions-stat-count">
                                            {viewCount} view{viewCount === 1 ? "" : "s"}
                                        </div>
                                    </div>
                                </div>     

                                <QuestionItem
                                    idx={idx}
                                    id={id}
                                    title={title}
                                    body={body}
                                    user={user}
                                    question={question}
                                    tags={tags} />
                            </div>
                        )
                    })}

                    <div className="questions-filter">
                        <FilterQuestion
                            type="next"
                            values={pages}
                            action={this.props.changePageNumber}
                            active={search.pageNumber} 
                            bp1 = {bp1} 
                            bp2 = {bp2} />

                        <FilterQuestion
                            type="per page"
                            values={[15, 30, 45]}
                            action={this.props.changePageLimit}
                            active={search.pageLimit} />
                    </div>
                </div>
            )
        } 
    }
}

export default Questions; 
