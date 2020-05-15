import React from 'react'; 

class Answers extends React.Component {
    componentDidMount() { 
        this.props.fetchAnswers(this.props.question.id)
    }

    render() {
        const { answers } = this.props; 
        if (!answers) return null; 

        return (
            <div>
                {answers.map((answer, idx) => 
                    <div key={idx}>{answer.body}{answer.user.username}</div>

                )}
            </div>
        )
    }
}

export default Answers; 