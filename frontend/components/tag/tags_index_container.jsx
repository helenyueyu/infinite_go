import { connect } from 'react-redux';

import TagIndex from './tags_index';
import { fetchTags } from '../../actions/tags_actions'; 

const mapStateToProps = (state) => ({
    tags: state.entities.tags
});

const mapDispatchToProps = dispatch => ({
    fetchTags: () => dispatch(fetchTags())
});

export default connect(mapStateToProps, mapDispatchToProps)(TagIndex); 