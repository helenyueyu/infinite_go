import { connect } from 'react-redux';
import Questions from './questions';
import { fetchFilteredQuestions } from '../../actions/questions_actions';
import { sortByUpvotes } from '../../selectors/sort_selectors'; 
import { changeQuestionPageNumber, 
        changeQuestionPageLimit, 
        receiveQuery, 
        changeQuestionFilter } from '../../actions/question_search_actions'; 

const mapStateToProps = state => {
    const questions = Object.values(state.entities.questions); 
    return {
    questions: sortByUpvotes(questions),
    questionCount: questions.length > 0 ? questions[0].questionCount : 0,  
    search: state.entities.search.question, 
    watchedTags: state.entities.watchedTags, 
    ignoredTags: state.entities.ignoredTags 
}}

const mapDispatchToProps = dispatch => ({
    receiveQuery: query => dispatch(receiveQuery(query)), 
    fetchFilteredQuestions: (page, perPage, query, filter) => dispatch(fetchFilteredQuestions(page, perPage, query, filter)), 
    changePageNumber: num => dispatch(changeQuestionPageNumber(num)),
    changePageLimit: num => dispatch(changeQuestionPageLimit(num)), 
    changeQuestionFilter: filter => dispatch(changeQuestionFilter(filter))
})

export default connect(mapStateToProps, mapDispatchToProps)(Questions)