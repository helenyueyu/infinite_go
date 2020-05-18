import { connect } from 'react-redux';
import Tags from './tags';

import { deleteTag } from '../../actions/tags_actions'; 

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = dispatch => ({
    deleteTag: id => dispatch(deleteTag(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Tags)