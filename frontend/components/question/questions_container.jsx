import { connect } from 'react-redux';
import Questions from './questions';
import { fetchFilteredQuestions } from '../../actions/questions_actions';
import { sortByNewest } from '../../selectors/sort_selectors'; 
import { changeQuestionPageNumber, changeQuestionPageLimit, receiveQuery } from '../../actions/question_search_actions'; 

const mapStateToProps = state => {
    const questions = Object.values(state.entities.questions); 
    return {
    questions: sortByNewest(questions),
    questionCount: questions.length > 0 ? questions[0].questionCount : 0,  
    search: state.entities.search.question, 
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