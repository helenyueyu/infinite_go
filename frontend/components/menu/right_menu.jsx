import React from 'react';

import RandomQuestions from './random_questions'; 
import TagStats from './tag_stats'; 

class RightMenu extends React.Component {
    componentDidMount() {
        this.props.fetchRandomQuestions(); 
        this.props.fetchTagStats(); 
    }

    componentDidUpdate(prevProps) {
        if (prevProps.location.pathname !== this.props.location.pathname) {
            this.props.fetchQuestion(this.props.match.params.questionId); 
        }
    }
    render() {
        let { questions, tagStats } = this.props; 
        if (Object.keys(questions).length === 0) return null; 
        return (
            <div className="right_menu">
                <TagStats tagStats={tagStats} />
                <RandomQuestions questions={questions} />
            </div>
        )
    }
}

export default RightMenu; 