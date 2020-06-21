import { connect } from 'react-redux';
import QuestionForm from './question_form'; 

import { createQuestion } from '../../actions/questions_actions';

const mapStateToProps = state => ({
   userId: state.session.id, 
   type: "new", 
   questions: state.entities.questions 
})

const mapDispatchToProps = dispatch => {
    return {
    action: question => dispatch(createQuestion(question))
}}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionForm)