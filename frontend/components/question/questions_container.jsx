import { connect } from 'react-redux';
import Questions from './questions';
import { fetchAllQuestions, fetchFilteredQuestions } from '../../actions/questions_actions';
import { sortByNewest } from '../../selectors/sort_selectors'; 
import { changePageNumber, changePageLimit } from '../../actions/search_actions'; 


const mapStateToProps = state => {
    return {
    questions: sortByNewest(Object.values(state.entities.questions)),
    search: state.entities.search 
}}

const mapDispatchToProps = dispatch => ({
    fetchAllQuestions: () => dispatch(fetchAllQuestions()), 
    fetchFilteredQuestions: (page, perPage, query) => dispatch(fetchFilteredQuestions(page, perPage, query)), 
    changePageNumber: num => dispatch(changePageNumber(num)),
    changePageLimit: num => dispatch(changePageLimit(num))
})

export default connect(mapStateToProps, mapDispatchToProps)(Questions)