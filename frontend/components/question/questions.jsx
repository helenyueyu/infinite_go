import React from 'react'; 

import { Link } from 'react-router-dom'; 

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
        this.props.fetchMetas(); 
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

    generatePageNumbers(numQuestions, perPage, pageNumber) {
        numQuestions = parseInt(numQuestions); 
        perPage = parseInt(perPage); 
        pageNumber = parseInt(pageNumber); 

        let breakPoint1 = null; 
        let breakPoint2 = null; 

        let max = Math.floor(numQuestions/perPage) + 1; 
        if (max <= 8) {
            const temp = []; 
            for (let i = 1; i <= max; i++) {
                temp.push(i); 
            }
            return [temp, null, null]; 
        }

        if (pageNumber >= 1 && pageNumber <= 4) {
            const arr = []; 
            for (let i = 1; i <= 4; i++) {
                arr.push(i); 
            }
            arr.push(5); 
            arr.push(max); 
            breakPoint1 = 5; 

            return [arr, breakPoint1, breakPoint2]; 
        } else if (pageNumber >= max-3 && pageNumber <= max) {
            const arr = []; 
            arr.push(1); 
            for (let i = max-4; i <= max; i++) {
                arr.push(i); 
            }
            breakPoint1 = 1; 
            return [arr, breakPoint1, breakPoint2]; 
        } else {
            const arr = []; 
            arr.push(1); 
            for (let i = pageNumber-2; i <= pageNumber+2; i++) {
                arr.push(i); 
            }
            arr.push(max); 
            breakPoint1 = 1; 
            breakPoint2 = pageNumber+2; 
            return [arr, breakPoint1, breakPoint2]; 
        }      
    }

    render() {
        let {questions, search, questionCount} = this.props; 
        if (!questions || !search) return null; 

        const [pages, bp1, bp2] = this.generatePageNumbers(questionCount, search.pageLimit, search.pageNumber); 
        if (questions) {
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
                        let {id, title, body, user, voteCount, viewCount, answerCount, tags, hasAcceptedAnswer } = question; 
                        return (
                            <div key={idx} className="questions-item">
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
