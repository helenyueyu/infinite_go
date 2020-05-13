import React from 'react'; 
import { Link } from 'react-router-dom'; 

class Questions extends React.Component {
    componentDidMount() {
        this.props.fetchAllQuestions(); 
    }

    render() {
        let {questions} = this.props; 
        if (questions) {
            return (
                <div>
                    <Link to="/questions/new"><button>Create Question</button></Link>

                    {questions.map((question, idx) => {
                        return (
                            <Link to={`/questions/${question.id}`} key={idx}>
                                <div>
                                    {question.title}
                                    {question.body}
                                </div>
                            </Link>
                        )
                    })}
                </div>
            )
        } else {
            return null; 
        }
    }
}

export default Questions; 
