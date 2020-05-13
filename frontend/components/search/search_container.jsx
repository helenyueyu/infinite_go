import { connect } from 'react-redux';
import Search from './search';
import { fetchFilteredQuestions } from '../../actions/question_actions';

const mapStateToProps = state => ({
    questions: Object.values(state.entities.questions),
})

const mapDispatchToProps = dispatch => ({
    fetchFilteredQuestions: (query) => dispatch(fetchFilteredQuestions(query))
})

export default connect(mapStateToProps, mapDispatchToProps)(Search)