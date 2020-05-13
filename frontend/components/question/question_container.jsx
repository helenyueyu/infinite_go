import { connect } from 'react-redux'; 
import Question from './question'; 
import { fetchQuestion } from '../../actions/question_actions'; 

const mapStateToProps = (state, ownProps) => {
    return {
    question: state.entities.questions[ownProps.match.params.questionId], 
    currentUser: state.entities.currentUser 
}}

const mapDispatchToProps = dispatch => ({
    fetchQuestion: id => dispatch(fetchQuestion(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Question); 
