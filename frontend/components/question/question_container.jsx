import { connect } from 'react-redux'; 
import Question from './question'; 
import { fetchQuestion, deleteQuestion } from '../../actions/questions_actions'; 

const mapStateToProps = (state, ownProps) => {
    return {
    question: state.entities.questions[ownProps.match.params.questionId], 
    currentUser: state.entities.currentUser 
}}

const mapDispatchToProps = dispatch => ({
    fetchQuestion: id => dispatch(fetchQuestion(id)), 
    deleteQuestion: id => dispatch(deleteQuestion(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Question); 
