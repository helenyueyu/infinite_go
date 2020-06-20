import { connect } from 'react-redux';
import QuestionForm from './question_form'; 

import { fetchQuestion, updateQuestion } from '../../actions/questions_actions';

const mapStateToProps = (state, ownProps) => {
    return {
    userId: state.session.id, 
    question: state.entities.questions[ownProps.match.params.questionId], 
    type: "edit"
}}

const mapDispatchToProps = dispatch => {
    return {
    fetchQuestion: question => dispatch(fetchQuestion(question)), 
    action: question => dispatch(updateQuestion(question))
}}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionForm)