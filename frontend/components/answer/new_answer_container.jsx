import { connect } from 'react-redux';
import AnswerForm from './answer_form';

import { createAnswer, fetchAnswers } from '../../actions/answers_actions';

const mapStateToProps = (state, ownProps) => {
    return {
    userId: state.session.id,
    type: "new", 
    question: ownProps.question 
}}

const mapDispatchToProps = dispatch => ({
    action: answer => dispatch(createAnswer(answer)), 
    fetchAnswers: (questionId) => dispatch(fetchAnswers(questionId))
})

export default connect(mapStateToProps, mapDispatchToProps)(AnswerForm)