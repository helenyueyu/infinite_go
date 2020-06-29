import React from 'react'; 

import { pluralize, pluralizeWordOnly } from '../../selectors/display_selectors'; 

const QuestionStats = ({voteCount, answerCount, viewCount, hasAcceptedAnswer}) => (
    <div className="questions-statistics">

        <div className="questions-statistics-votes">
            <div className="questions-stat">{voteCount}</div>
            <div className="questions-stat-count">
                {pluralizeWordOnly(voteCount, "vote")}
            </div>
        </div>

        <div className={answerCount === 0 ? "questions-statistics-answers" : (hasAcceptedAnswer ? "questions-statistics-answers-accepted": "questions-statistics-answers-greater")}>
            <div className="questions-stat">{answerCount}</div>
            <div className="questions-stat-count">
                {pluralizeWordOnly(answerCount, "answer")}
            </div>
        </div>

        <div className="questions-statistics-views">
            <div className="questions-stat-count">
                {pluralize(viewCount, "view")}
            </div>
        </div>

    </div>   
); 

export default QuestionStats; 
