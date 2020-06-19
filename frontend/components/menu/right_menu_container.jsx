import { connect } from 'react-redux';
import RightMenu from './right_menu';

import { fetchRandomQuestions } from '../../actions/questions_actions';

const mapStateToProps = (state) => {
    return {
    questions: state.entities.metas.randomQuestions 
}}

const mapDispatchToProps = dispatch => {
    return {
    fetchRandomQuestions: () => dispatch(fetchRandomQuestions()),
}}

export default connect(mapStateToProps, mapDispatchToProps)(RightMenu)