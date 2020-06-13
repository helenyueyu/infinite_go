import { connect } from 'react-redux';
import Answers from './answers';

import { fetchAnswers, deleteAnswer, updateAnswer } from '../../actions/answers_actions';

const mapStateToProps = (state, {question}) => {
    return {
    question: question, 
    answers: Object.values(state.entities.answers), 
    currentUser: state.entities.currentUser 
}}

const mapDispatchToProps = dispatch => ({
    updateAnswer: answer => dispatch(updateAnswer(answer)), 
    fetchAnswers: (questionId) => dispatch(fetchAnswers(questionId)), 
    deleteAnswer: id => dispatch(deleteAnswer(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Answers)