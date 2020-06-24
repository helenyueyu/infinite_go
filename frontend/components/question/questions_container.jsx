import { connect } from 'react-redux';
import Questions from './questions';
import { fetchFilteredQuestions } from '../../actions/questions_actions';
import { sortByNewest } from '../../selectors/sort_selectors'; 
import { changeQuestionPageNumber, changeQuestionPageLimit, receiveQuery } from '../../actions/question_search_actions'; 

const mapStateToProps = state => {
    const { questionCount } = state.entities.questions; 
    delete state.entities.questions['questionCount']; 
    return {
    questions: sortByNewest(Object.values(state.entities.questions)),
    questionCount: questionCount, 
    search: state.entities.search, 
    watchedTags: state.entities.watchedTags, 
    ignoredTags: state.entities.ignoredTags 
}}

const mapDispatchToProps = dispatch => ({
    receiveQuery: query => dispatch(receiveQuery(query)), 
    fetchFilteredQuestions: (page, perPage, query) => dispatch(fetchFilteredQuestions(page, perPage, query)), 
    changePageNumber: num => dispatch(changeQuestionPageNumber(num)),
    changePageLimit: num => dispatch(changeQuestionPageLimit(num))
})

export default connect(mapStateToProps, mapDispatchToProps)(Questions)