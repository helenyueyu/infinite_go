import { connect } from 'react-redux';

import TagIndex from './tags_index';
import { fetchTags, searchTags } from '../../actions/tags_actions'; 

const mapStateToProps = (state) => ({
    tags: state.entities.tags
});

const mapDispatchToProps = dispatch => ({
    fetchTags: () => dispatch(fetchTags()), 
    searchTags: query => dispatch(searchTags(query))
});

export default connect(mapStateToProps, mapDispatchToProps)(TagIndex); 