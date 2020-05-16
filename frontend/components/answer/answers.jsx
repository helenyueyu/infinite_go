import React from 'react'; 

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
                {answers.map((answer, idx) => (
                    <AnswerItem key={idx}
                        questionId={question.id}
                        id={answer.id}
                        body={answer.body}
                        createdAt={answer.createdAt}
                        username={answer.user.username}
                        authorized={currentUser.id === answer.user.id}
                        handleDelete={(id) => this.handleDelete(id)}
                    />
                ))}   
            </div>
        )
    }
}

export default Answers; 

