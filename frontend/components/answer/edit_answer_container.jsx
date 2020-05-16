import { connect } from 'react-redux';
// import AnswerForm from './answer_form';
import EditAnswer from './edit_answer'; 

import { fetchQuestion } from '../../actions/questions_actions'; 
import { fetchAnswers, updateAnswer } from '../../actions/answers_actions';

const mapStateToProps = (state, ownProps) => {
    // debugger; 
    return {
    userId: state.session.id,
    question: state.entities.questions[ownProps.match.params.questionId], 
    answer: state.entities.answers[ownProps.match.params.answerId], 
    type: "edit" 
}}

const mapDispatchToProps = dispatch => ({
    action: answer => dispatch(updateAnswer(answer)), 
    fetchQuestion: id => dispatch(fetchQuestion(id)), 
    fetchAnswers: (questionId) => dispatch(fetchAnswers(questionId))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditAnswer)