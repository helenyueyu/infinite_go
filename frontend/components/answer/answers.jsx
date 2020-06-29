import React from 'react'; 

import VoteContainer from '../vote/vote_container'; 
import AnswerItem from './answer_item'; 
import { pluralize } from '../../selectors/display_selectors'; 

class Answers extends React.Component {
    componentDidMount() { 
        this.props.fetchAnswers(this.props.question.id)

        this.handleDelete = this.handleDelete.bind(this); 
    }

    handleDelete(id) {
        this.props.deleteAnswer(id); 
    }

    render() {
        if (!this.props.answers) return null; 
        const { question, answers, currentUser } = this.props;
        const answerCount = answers.length;  
        return (
            <div className="answers">
                <div className="answers-count">
                    {answerCount !== 0 ?  pluralize(answerCount, "Answer") : null}
                </div>
                {answers.map((answer, idx) => {
                    let { id, voteCount, questionId, accepted, currentVote } = answer; 
                    return (<div key={idx} className="answers-item">
                        <div className="answers-vote">
                            <VoteContainer
                                voteable_id={id}
                                voteable_type="Answer"
                                count={voteCount}
                                action={this.props.fetchAnswers}
                                info={questionId} 
                                currentVote={currentVote}
                                />
                                
                            <div>
                                {accepted ? <i className="fas fa-check"></i> : null}
                            </div>
                            
                        </div>

                        <AnswerItem key={idx}
                            accepted={accepted}
                            questionId={question.id}
                            id={answer.id}
                            body={answer.body}
                            createdAt={answer.createdAt}
                            username={answer.user.username}
                            reputation={answer.user.reputation}
                            medals={answer.user.medals}
                            user={answer.user}
                            authorized={currentUser.id === answer.user.id}
                            canAccept={currentUser.id === question.user.id}
                            handleDelete={(id) => this.handleDelete(id)}
                            handleUpdate={(answer) => this.props.updateAnswer(answer)}
                        />
                    </div>)
                })}   
            </div>
        )
    }
}

export default Answers; 


