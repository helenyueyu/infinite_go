import { connect } from 'react-redux';
import RightMenu from './right_menu';

import { fetchRandomQuestions, fetchQuestion } from '../../actions/questions_actions';
import { fetchTagStats } from '../../actions/metas_actions'; 
import { searchTags, createWatchTag } from '../../actions/tags_actions'; 

const mapStateToProps = (state) => {
    return {
    questions: state.entities.metas.randomQuestions, 
    tagStats: state.entities.metas.tagStats, 
    tags: state.entities.tags, 
    userId: state.session.id 
}}

const mapDispatchToProps = dispatch => {
    return {
    fetchRandomQuestions: () => dispatch(fetchRandomQuestions()),
    fetchQuestion: id => dispatch(fetchQuestion(id)), 
    fetchTagStats: () => dispatch(fetchTagStats()), 
    searchTags: (query) => dispatch(searchTags(query)), 
    createWatchTag: (tag) => dispatch(createWatchTag(tag))
}}

export default connect(mapStateToProps, mapDispatchToProps)(RightMenu)