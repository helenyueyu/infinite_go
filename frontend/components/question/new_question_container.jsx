import { connect } from 'react-redux';
import NewQuestion from './new_question';
import QuestionForm from './question_form'; 

import { createQuestion } from '../../actions/question_actions';

const mapStateToProps = state => ({
   userId: state.session.id, 
   type: "new"
})

const mapDispatchToProps = dispatch => ({
    action: question => dispatch(createQuestion(question))
})

export default connect(mapStateToProps, mapDispatchToProps)(QuestionForm)