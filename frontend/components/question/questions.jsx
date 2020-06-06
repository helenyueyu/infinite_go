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

    generatePageNumbers(numQuestions, perPage, pageNumber) {
        /*
        check if the pageNumber is within the first four or the last four   
        */
        let max = Math.floor(numQuestions/perPage); 
        let arr = []; 
        if (pageNumber >= 1 && pageNumber <= 4) {
            for (let i = 1; i <= 5; i++) {
                arr.push(i); 
            }
            arr.push('...'); 
            arr.push(max); 
        } else if (pageNumber >= max - 3 && pageNumber <= max) {
            arr.push(1); 
            arr.push('...'); 
            for (let i = max-4; i <= max; i++) {
                arr.push(i); 
            }
        } else {
            arr.push(1); 
            arr.push('...'); 
            for (let i = pageNumber-2; i <= pageNumber+2; i++) {
                arr.push(i); 
            }
            arr.push('...'); 
            arr.push(max); 
        }
        // for (let i = pageNumber-2; i <= pageNumber+2; i++) {
        //     if (i >= 0 && i <= max) {
        //         arr.push(i); 
        //     }
        // }
        // for (let i = 1; i <= count; i++) {
        //     arr.push(i); 
        // }
        console.log('arr', arr)        
        return arr; 
    }

    render() {
        let {questions, search, metas: { questionCount }} = this.props; 
        if (!questions || !questionCount || !search) return null; 

        const pages = this.generatePageNumbers(questionCount, search.pageLimit, search.pageNumber); 
        
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
