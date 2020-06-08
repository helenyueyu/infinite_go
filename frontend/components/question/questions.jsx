import React from 'react'; 

import { Link } from 'react-router-dom'; 

import FilterQuestion from './filter_question'; 

import QuestionItem from './question_item'; 


class Questions extends React.Component {
    constructor(props) {
        super(props); 
        this.fetchQuestions = this.fetchQuestions.bind(this); 

    }
    componentDidMount() {
        this.props.fetchMetas(); 
        let url = this.props.history.location.pathname;
        if (url.includes('tagged')) {
            let query = '[' + url.slice(url.lastIndexOf('/') + 1) + ']'; 
            this.props.receiveQuery(query); 
        }
        if (this.props.search.query === "") this.fetchQuestions(this.props.search)
    }

    componentDidUpdate(prevProps) {
        if (this.newSearchParams(prevProps.search, this.props.search)) this.fetchQuestions(this.props.search); 
    }

    fetchQuestions({pageNumber, pageLimit, query}) {
        this.props.fetchFilteredQuestions(pageNumber, pageLimit, query); 
    }

    newSearchParams(h1, h2) {
        return h1.pageNumber !== h2.pageNumber || 
            h1.pageLimit !== h2.pageLimit || 
            h1.query !== h2.query 
    }

    generatePageNumbers(numQuestions, perPage, pageNumber) {
        let bp1 = null; 
        let bp2 = null; 

        let max = Math.floor(numQuestions/perPage); 
        let arr = []; 
        if (pageNumber >= 1 && pageNumber <= 4) {
            arr = []; 
            for (let i = 1; i <= 5; i++) {
                arr.push(i); 
            }
            bp1 = 5; 
            arr.push(max); 
        } else if (pageNumber >= max-3 && pageNumber <= max) {
            arr = []; 
            arr.push(1); 
            for (let i = max-4; i <= max; i++) {
                arr.push(i); 
            }
            bp1 = 1; 
        } else {
            arr = []; 
            arr.push(1); 
            for (let i = pageNumber-2; i <= pageNumber+2; i++) {
                arr.push(i); 
            }
            arr.push(max); 
            bp1 = 1; 
            bp2 = pageNumber+2; 
        }      
        return [arr, bp1, bp2]; 
    }

    render() {
        // console.log("my props", this.props.history.location)
        let {questions, search, metas: { questionCount }} = this.props; 
        if (!questions || !questionCount || !search) return null; 
        const [pages, bp1, bp2] = this.generatePageNumbers(questionCount, search.pageLimit, search.pageNumber); 
        if (questions) {
            return (
                <div>
                    <Link to="/questions/new"><button className="questions-create-question">Create Question</button></Link>
                    {questionCount}
                    
                    {questions.map((question, idx) => {
                        let {id, title, body, user, voteCount, viewCount, answerCount, tags} = question; 
                        return (
                            <div key={idx} className="questions-item">
                                
                                <div className="questions-statistics">
                                    <div className="questions-statistics-votes">
                                        <div className="questions-statistics-votes-number">{voteCount}</div>
                                        <div>vote{voteCount === 1 ? "" : "s"}</div>
                                    </div>
                                    <div className="questions-statistics-answers">
                                        <div>{answerCount}</div>
                                        <div>answer{answerCount === 1 ? "" : "s"}</div>
                                    </div>
                                    <div className="questions-statistics-views">
                                        <div>{viewCount}</div>
                                        <div>view{viewCount === 1 ? "" : "s"}</div>
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
                            values={pages.slice(0)}
                            action={this.props.changePageNumber}
                            active={search.pageNumber} 
                            bp1 = {bp1} 
                            bp2 = {bp2} />

                        <FilterQuestion
                            type="per page"
                            values={[5, 10, 15]}
                            action={this.props.changePageLimit}
                            active={search.pageLimit} />
                    </div>
                </div>
            )
        } 
    }
}

export default Questions; 
