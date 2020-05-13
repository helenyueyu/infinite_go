import { connect } from 'react-redux';
import Questions from './questions';
import { fetchAllQuestions } from '../../actions/question_actions';

const mapStateToProps = state => ({
    questions: Object.values(state.entities.questions),
})

const mapDispatchToProps = dispatch => ({
    fetchAllQuestions: () => dispatch(fetchAllQuestions())
})

export default connect(mapStateToProps, mapDispatchToProps)(Questions)