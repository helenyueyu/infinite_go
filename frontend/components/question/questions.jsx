import React from 'react'; 

import { Link } from 'react-router-dom'; 

import FilterQuestion from './filter_question'; 
import VoteContainer from '../vote/vote_container'; 

import QuestionItem from './question_item'; 


class Questions extends React.Component {
    constructor(props) {
        super(props); 
        this.fetchQuestions = this.fetchQuestions.bind(this); 

    }
    componentDidMount() {
        this.props.fetchMetas(); 
        this.fetchQuestions(this.props.search); 
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

    generatePageNumbers(numQuestions, perPage) {
        let count = Math.floor(numQuestions/perPage); 
        let arr = []; 
        for (let i = 1; i <= count; i++) {
            arr.push(i); 
        }
        return arr; 
    }

    render() {
        let {questions, search, metas: { questionCount }} = this.props; 
        if (!questions || !questionCount || !search) return null; 
        const pages = this.generatePageNumbers(questionCount, search.pageLimit); 
        
        console.log('search', search); 

        if (questions) {
            return (
                <div>
                    <Link to="/questions/new"><button>Create Question</button></Link>
                    {questionCount}
                    <FilterQuestion 
                        type="next" 
                        values={pages}
                        action={this.props.changePageNumber}
                        active={search.pageNumber} />
                    
                    <FilterQuestion 
                        type="per page"
                        values={[5, 10, 15]}
                        action={this.props.changePageLimit}
                        active={search.pageLimit} />
                    
                    {questions.map((question, idx) => {
                        let {id, title, body, user, voteCount, tags} = question; 
                        return (
                            <div key={idx} className="questions-item">
                                
                                <VoteContainer 
                                    voteable_id={id} 
                                    voteable_type="Question"
                                    count={voteCount} 
                                    action={this.fetchQuestions} 
                                    info={this.props.search} />
                                
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
                </div>
            )
        } 
    }
}

export default Questions; 
