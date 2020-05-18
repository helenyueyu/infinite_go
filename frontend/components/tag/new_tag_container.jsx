import { connect } from 'react-redux';
import NewTag from './new_tag';

import { createTag } from '../../actions/tags_actions';

const mapStateToProps = (state, { taggable_id, taggable_type }) => {
    return {
        user_id: state.session.id,
        taggable_id: taggable_id,
        taggable_type: taggable_type
    }
}

const mapDispatchToProps = dispatch => ({
    createTag: tag => dispatch(createTag(tag))
})

export default connect(mapStateToProps, mapDispatchToProps)(NewTag)