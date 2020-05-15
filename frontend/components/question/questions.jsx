import React from 'react'; 
import moment from 'moment'; 

import { Link } from 'react-router-dom'; 
import FilterQuestion from './filter_question'; 

class Questions extends React.Component {
    componentDidMount() {
        this.fetchQuestions();  
    }

    componentDidUpdate(prevProps) {
        if (this.newSearchParams(prevProps.search, this.props.search)) this.fetchQuestions(); 
    }

    fetchQuestions() {
        let { pageNumber, pageLimit, query } = this.props.search; 
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
                        let {id, title, body, user} = question; 
                        return (
                            <div key={idx}>
                                <div><Link to={`/questions/${id}`}>{title}</Link></div>
                                <div>{body}</div>
                                <div>{user.username}</div>
                                <div>{moment(question.createdAt).fromNow()}</div>
                                <br/>
                            </div>
                        )
                    })}

                </div>
            )
        } 
    }
}

export default Questions; 
