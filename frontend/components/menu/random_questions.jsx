import React from 'react'; 
import { Link } from 'react-router-dom'; 
import { nameExtensionURL } from '../../selectors/display_selectors'; 

const RandomQuestions = ({questions}) => (
    <div>
        <h1 className="right_menu-title">Hot Network Questions</h1>
        <ul>
            {questions.map((question, idx) =>
                <li className="right_menu-li" key={idx}>
                    <Link className="right_menu-link" 
                        to={`/questions/${question.id}/${nameExtensionURL(question.title)}`}>{question.title}
                    </Link>
                </li>
            )}
        </ul>
    </div>
)

export default RandomQuestions; 
