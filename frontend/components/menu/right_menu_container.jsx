import { connect } from 'react-redux';
import RightMenu from './right_menu';

import { fetchRandomQuestions, fetchQuestion } from '../../actions/questions_actions';
import { fetchTagStats } from '../../actions/metas_actions'; 

const mapStateToProps = (state) => {
    return {
    questions: state.entities.metas.randomQuestions, 
    tagStats: state.entities.metas.tagStats 
}}

const mapDispatchToProps = dispatch => {
    return {
    fetchRandomQuestions: () => dispatch(fetchRandomQuestions()),
    fetchQuestion: id => dispatch(fetchQuestion(id)), 
    fetchTagStats: () => dispatch(fetchTagStats())
}}

export default connect(mapStateToProps, mapDispatchToProps)(RightMenu)