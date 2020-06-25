import { connect } from 'react-redux';

import TagIndex from './tags_index';
import { fetchTags, searchTags } from '../../actions/tags_actions'; 
import { changeTagPageNumber } from '../../actions/tag_search_actions';
import { fetchPaginatedTags, updateTagDescription } from '../../actions/tags_actions'; 
import { fetchStats } from '../../actions/metas_actions'; 

const mapStateToProps = (state) => ({
    tags: Object.values(state.entities.tags), 
    search: state.entities.search.tag, 
    tagCount: state.entities.metas.stats.tagCount 
});

const mapDispatchToProps = dispatch => ({
    fetchTags: () => dispatch(fetchTags()), 
    searchTags: query => dispatch(searchTags(query)), 
    fetchPaginatedTags: (pageNumber, pageLimit) => dispatch(fetchPaginatedTags(pageNumber, pageLimit)), 
    changeTagPageNumber: pageNumber => dispatch(changeTagPageNumber(pageNumber)), 
    fetchStats: () => dispatch(fetchStats()), 
    updateTagDescription: tag => dispatch(updateTagDescription(tag))
});

export default connect(mapStateToProps, mapDispatchToProps)(TagIndex); 