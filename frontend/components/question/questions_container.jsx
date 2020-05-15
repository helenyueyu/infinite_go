import { connect } from 'react-redux';
import Questions from './questions';
import { fetchAllQuestions, fetchFilteredQuestions } from '../../actions/question_actions';
import { sortByNewest } from '../../selectors/sort_selectors'; 

const mapStateToProps = state => {
    // debugger 
    return {
    questions: sortByNewest(Object.values(state.entities.questions)),
    search: state.entities.search 
}}

const mapDispatchToProps = dispatch => ({
    fetchAllQuestions: () => dispatch(fetchAllQuestions()), 
    fetchFilteredQuestions: (page, perPage, query) => dispatch(fetchFilteredQuestions(page, perPage, query))
})

export default connect(mapStateToProps, mapDispatchToProps)(Questions)