import { connect } from 'react-redux';
import RightMenu from './right_menu';

import { fetchRandomQuestions, fetchQuestion } from '../../actions/questions_actions';

const mapStateToProps = (state) => {
    return {
    questions: state.entities.metas.randomQuestions 
}}

const mapDispatchToProps = dispatch => {
    return {
    fetchRandomQuestions: () => dispatch(fetchRandomQuestions()),
    fetchQuestion: id => dispatch(fetchQuestion(id))
}}

export default connect(mapStateToProps, mapDispatchToProps)(RightMenu)