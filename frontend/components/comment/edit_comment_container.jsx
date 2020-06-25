import { connect } from 'react-redux';
import NewComment from './new_comment';

import { updateComment } from '../../actions/comments_actions';

const mapStateToProps = (state, {commentable_id, commentable_type}) => {
    return {
        type: 'edit', 
        user_id: state.session.id,
        commentable_id: commentable_id, 
        commentable_type: commentable_type 
    }
}

const mapDispatchToProps = dispatch => ({
    action: comment => dispatch(updateComment(comment))
})

export default connect(mapStateToProps, mapDispatchToProps)(NewComment)