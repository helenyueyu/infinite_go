import { connect } from 'react-redux';
import NewComment from './new_comment';

import { createComment } from '../../actions/comments_actions';

const mapStateToProps = (state, {commentable_id, commentable_type}) => {
    return {
        user_id: state.session.id,
        commentable_id: commentable_id, 
        commentable_type: commentable_type 
    }
}

const mapDispatchToProps = dispatch => ({
    createComment: comment => dispatch(createComment(comment))
})

export default connect(mapStateToProps, mapDispatchToProps)(NewComment)