import { connect } from 'react-redux';
import Answers from './answers';

import { fetchAnswers, deleteAnswer } from '../../actions/answers_actions';

const mapStateToProps = (state) => {
    return {
    answers: Object.values(state.entities.answers), 
    currentUser: state.entities.currentUser 
}}

const mapDispatchToProps = dispatch => ({
    fetchAnswers: (questionId) => dispatch(fetchAnswers(questionId)), 
    deleteAnswer: id => dispatch(deleteAnswer(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Answers)