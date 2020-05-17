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

    render() {
        let {questions} = this.props; 
        if (!this.props.questions) return null; 

        if (questions) {
            return (
                <div>
                    <Link to="/questions/new"><button>Create Question</button></Link>

                    <FilterQuestion 
                        type="Change Page Number" 
                        values={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                        action={this.props.changePageNumber} />
                    
                    <FilterQuestion 
                        type="Change Page Limit"
                        values={[5, 10, 15]}
                        action={this.props.changePageLimit} />
                    
                    {questions.map((question, idx) => {
                        let {id, title, body, user, voteCount} = question; 
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
                                    question={question} />
                            </div>
                        )
                    })}
                </div>
            )
        } 
    }
}

export default Questions; 
