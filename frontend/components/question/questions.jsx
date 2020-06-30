import React from 'react'; 

import { Link } from 'react-router-dom'; 
import { isQuestionWatched, isQuestionIgnored, pluralize, createButtonStyle } from '../../selectors/display_selectors'; 
import { generatePageNumbers } from '../../selectors/pagination_selectors'; 
import { sortByNewest, sortByUpvotes } from '../../selectors/sort_selectors'; 

import FilterQuestion from './filter_question'; 
import QuestionStats from './question_stats'; 
import QuestionItem from './question_item'; 

class Questions extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            questionCount: this.props.questionCount, 
            activeIdx: 0 
        }
        this.fetchQuestions = this.fetchQuestions.bind(this); 
        this.handleFilter = this.handleFilter.bind(this); 
    }

    componentDidMount() {
        // debugger; 
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

    fetchQuestions({pageNumber, pageLimit, query, filter}) {
        this.props.fetchFilteredQuestions(pageNumber, pageLimit, query, filter); 
    }

    newSearchParams(h1, h2) {
        return h1.pageNumber !== h2.pageNumber || 
            h1.pageLimit !== h2.pageLimit || 
            h1.query !== h2.query 
    }

    newTag(oldTag, currTag) {
        return oldTag !== currTag; 
    }

    handleFilter(filter, idx) {
        // debugger; 
        this.setState({
            activeIdx: idx, 
        }, () => this.props.changeQuestionFilter(filter)); 
    }

    render() {
        let { questions, search, questionCount, watchedTags, ignoredTags } = this.props; 
        if (!questions || !search || questions.length === 0) return null; 

        if (search.filter === 'upvote') {
            questions = sortByUpvotes(questions); 
        } else {
            questions = sortByNewest(questions); 
        }

        const [pages, bp1, bp2] = generatePageNumbers(questionCount, search.pageLimit, search.pageNumber); 
        const { activeIdx } = this.state; 
        
        if (questions.length > 0) {
            return (
                <div className="questions">
                    <div className="questions-header">
                        <div className="questions-title">
                            All Questions 
                        </div>
                        <Link to="/questions/new">
                            <button className="focus-button shadow">
                                Ask Question
                            </button>
                        </Link>
                    </div>

                    <div className="questions-subheader">
                        <div className="questions-title-count">
                            {questionCount ? pluralize(questionCount, "question") : null}
                        </div>
                        <div className="tags_index-filter-group">
                            {['upvote', 'newest', 'unanswered'].map((filter, idx) => 
                                <button key={idx}
                                        className={createButtonStyle(activeIdx, idx, 2)} 
                                        onClick={() => this.handleFilter(filter, idx)}>
                                        {filter[0].toUpperCase() + filter.slice(1)}
                                </button>
                                )}
                        </div>
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

                                <QuestionStats 
                                    voteCount={voteCount} 
                                    answerCount={answerCount}
                                    viewCount={viewCount} 
                                    hasAcceptedAnswer={hasAcceptedAnswer} />

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
