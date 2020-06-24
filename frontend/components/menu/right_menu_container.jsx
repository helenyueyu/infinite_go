import { connect } from 'react-redux';
import RightMenu from './right_menu';

import { fetchRandomQuestions, fetchQuestion } from '../../actions/questions_actions';
import { fetchTagStats } from '../../actions/metas_actions'; 
import { searchTags, 
    fetchWatchedTags, createWatchedTag, deleteWatchedTag, 
    fetchIgnoredTags, createIgnoredTag, deleteIgnoredTag} 
    from '../../actions/tags_actions'; 

const mapStateToProps = (state) => {
    return {
    questions: state.entities.metas.randomQuestions, 
    tagStats: state.entities.metas.tagStats, 
    tags: state.entities.tags, 
    userId: state.session.id, 
    watchedTags: Object.values(state.entities.watchedTags), 
    ignoredTags: Object.values(state.entities.ignoredTags) 
}}

const mapDispatchToProps = dispatch => {
    return {
        fetchRandomQuestions: () => dispatch(fetchRandomQuestions()),
        fetchQuestion: id => dispatch(fetchQuestion(id)), 
        fetchTagStats: () => dispatch(fetchTagStats()), 
        searchTags: query => dispatch(searchTags(query)), 
        fetchWatchedTags: () => dispatch(fetchWatchedTags()), 
        createWatchedTag: tag => dispatch(createWatchedTag(tag)), 
        deleteWatchedTag: id => dispatch(deleteWatchedTag(id)), 
        fetchIgnoredTags: () => dispatch(fetchIgnoredTags()), 
        createIgnoredTag: tag => dispatch(createIgnoredTag(tag)), 
        deleteIgnoredTag: id => dispatch(deleteIgnoredTag(id))
}}

export default connect(mapStateToProps, mapDispatchToProps)(RightMenu)