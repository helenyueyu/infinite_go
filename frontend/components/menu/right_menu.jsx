import React from 'react';

import RandomQuestions from './random_questions'; 

class RightMenu extends React.Component {
    componentDidMount() {
        this.props.fetchRandomQuestions(); 
    }

    componentDidUpdate(prevProps) {
        if (prevProps.location.pathname !== this.props.location.pathname) {
            this.props.fetchQuestion(this.props.match.params.questionId); 
        }
    }
    render() {
        let { questions } = this.props; 
        if (Object.keys(questions).length === 0) return null; 
        return (
            <div className="right_menu">
                <RandomQuestions questions={questions} />

            </div>
        )
    }
}

export default RightMenu; 