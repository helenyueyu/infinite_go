import React from 'react';
import { Link } from 'react-router-dom'; 

class RightMenu extends React.Component {
    componentDidMount() {
        this.props.fetchRandomQuestions(); 
    }

    render() {
        console.log('props', this.props.questions); 

        let { questions } = this.props; 
        if (Object.keys(questions).length === 0) return null; 
        return (
            <div className="right_menu">
                <h1 className="right_menu-title">Hot Network Questions</h1>
                <ul>
                    {questions.map((question, idx) =>
                        <li className="right_menu-li" key={idx}>
                            <Link className="right_menu-link" to={`/questions/${question.id}`}>{question.title}</Link>
                        </li>
                    )}
                </ul>
            </div>
        )
    }
}

export default RightMenu; 