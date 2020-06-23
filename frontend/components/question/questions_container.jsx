import { connect } from 'react-redux';
import Questions from './questions';
import { fetchFilteredQuestions } from '../../actions/questions_actions';
import { sortByNewest } from '../../selectors/sort_selectors'; 
import { changePageNumber, changePageLimit } from '../../actions/search_actions'; 
import { receiveQuery } from '../../actions/search_actions'; 

const mapStateToProps = state => {
    const { questionCount } = state.entities.questions; 
    delete state.entities.questions['questionCount']; 
    return {
    questions: sortByNewest(Object.values(state.entities.questions)),
    questionCount, 
    search: state.entities.search, 
    watchedTags: state.entities.watchedTags
}}

const mapDispatchToProps = dispatch => ({
    receiveQuery: query => dispatch(receiveQuery(query)), 
    fetchFilteredQuestions: (page, perPage, query) => dispatch(fetchFilteredQuestions(page, perPage, query)), 
    changePageNumber: num => dispatch(changePageNumber(num)),
    changePageLimit: num => dispatch(changePageLimit(num))
})

export default connect(mapStateToProps, mapDispatchToProps)(Questions)