import React from 'react'; 

import VoteContainer from '../vote/vote_container'; 
import AnswerItem from './answer_item'; 

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
        return (
            <div>
                {answers.map((answer, idx) => {
                    let { id, voteCount, questionId } = answer; 
                    return (<div key={idx} className="answers-item">
                        <VoteContainer
                            voteable_id={id}
                            voteable_type="Answer"
                            count={voteCount}
                            action={this.props.fetchAnswers}
                            info={questionId} />

                        <AnswerItem key={idx}
                            questionId={question.id}
                            id={answer.id}
                            body={answer.body}
                            createdAt={answer.createdAt}
                            username={answer.user.username}
                            authorized={currentUser.id === answer.user.id}
                            handleDelete={(id) => this.handleDelete(id)}
                        />
                    </div>)
                })}   
            </div>
        )
    }
}

export default Answers; 


