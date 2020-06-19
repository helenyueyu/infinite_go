import React from 'react';
import { Link } from 'react-router-dom'; 

debugger; 
class RightMenu extends React.Component {
    componentDidMount() {
        // debugger; 
        // this.props.fetchRandomQuestions(); 
    }

    render() {
        // let { questions } = this.props; 
        // if (Object.keys(questions).length === 0) return null; 
        // debugger; 
        return (
            <div className="right_menu">
                {/* <h1 className="right_menu-title">Hot Network Questions</h1>
                <ul>
                    {questions.map((question, idx) =>
                        <li className="right_menu-li" key={idx}>
                            <Link className="right_menu-link" to={`/questions/${question.id}`}>{question.title}</Link>
                        </li>
                    )}
                </ul> */}
                Hello
            </div>
        )
    }
}

export default RightMenu; 