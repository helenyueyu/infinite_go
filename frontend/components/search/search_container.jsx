import { connect } from 'react-redux';
import Search from './search';
import { fetchFilteredQuestions, fetchAllQuestions } from '../../actions/questions_actions';
import { receiveQuery } from '../../actions/search_actions'; 

const mapStateToProps = (state, ownProps) => ({
    questions: Object.values(state.entities.questions),
    search: state.entities.search
})

const mapDispatchToProps = dispatch => ({
    fetchFilteredQuestions: (page, pageLimit, query) => dispatch(fetchFilteredQuestions(page, pageLimit, query)), 
    fetchAllQuestions: () => dispatch(fetchAllQuestions()), 
    receiveQuery: query => dispatch(receiveQuery(query))
})

export default connect(mapStateToProps, mapDispatchToProps)(Search)