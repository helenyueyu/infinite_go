import React from 'react'; 
import { Link } from 'react-router-dom'; 

class Questions extends React.Component {
    componentDidMount() {
        this.props.fetchAllQuestions(); 
    }

    render() {
        let {questions} = this.props; 
        if (!this.props.questions) return null; 

        if (questions) {
            return (
                <div>
                    <Link to="/questions/new"><button>Create Question</button></Link>

                    {questions.map((question, idx) => {
                        let {id, title, body, user} = question; 
                        return (
                            <div key={idx}>
                                <div><Link to={`/questions/${id}`}>{title}</Link></div>
                                <div>{body}</div>
                                <div>{user.username}</div>
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
