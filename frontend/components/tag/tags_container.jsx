import { connect } from 'react-redux';
import Tags from './tags';

import { deleteTaggable } from '../../actions/taggable_actions'; 

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => ({
    deleteTaggable: id => dispatch(deleteTaggable(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Tags)