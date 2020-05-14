import { connect } from 'react-redux';
import Search from './search';
import { fetchFilteredQuestions, fetchAllQuestions } from '../../actions/question_actions';
import { receiveQuery, changePageNumber, changePageLimit } from '../../actions/search_actions'; 

const mapStateToProps = (state, ownProps) => ({
    questions: Object.values(state.entities.questions),
    search: state.entities.search
})

const mapDispatchToProps = dispatch => ({
    fetchFilteredQuestions: (page, pageLimit, query) => dispatch(fetchFilteredQuestions(page, pageLimit, query)), 
    fetchAllQuestions: () => dispatch(fetchAllQuestions()), 
    receiveQuery: query => dispatch(receiveQuery(query)), 
    changePageNumber: num => dispatch(changePageNumber(num)), 
    changePageLimit: num => dispatch(changePageLimit(num))
})

export default connect(mapStateToProps, mapDispatchToProps)(Search)