import { connect } from 'react-redux';

import TagIndex from './tag_index';
import { convertToArray } from '../../selectors/tag_selectors'; 
import { fetchTags } from '../../actions/tags_actions'; 

const mapStateToProps = (state) => ({
    tags: convertToArray(state.entities.tags)
});

const mapDispatchToProps = dispatch => ({
    fetchTags: () => dispatch(fetchTags())
});

export default connect(mapStateToProps, mapDispatchToProps)(TagIndex); 