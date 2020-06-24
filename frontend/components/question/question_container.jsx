import { connect } from 'react-redux'; 
import Question from './question'; 
import { fetchQuestion, deleteQuestion } from '../../actions/questions_actions'; 
import { createBookmark } from '../../actions/bookmarks_actions'; 

const mapStateToProps = (state, ownProps) => {
    return {
    question: state.entities.questions[ownProps.match.params.questionId], 
    comments: state.entities.comments, 
    currentUser: state.entities.currentUser 
}}

const mapDispatchToProps = dispatch => ({
    fetchQuestion: id => dispatch(fetchQuestion(id)), 
    deleteQuestion: id => dispatch(deleteQuestion(id)), 
    createBookmark: bookmark => dispatch(createBookmark(bookmark))
})

export default connect(mapStateToProps, mapDispatchToProps)(Question); 
