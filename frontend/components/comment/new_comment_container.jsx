import { connect } from 'react-redux';
import CommentForm from './comment_form';

import { createComment } from '../../actions/comments_actions';

const mapStateToProps = (state, {commentable_id, commentable_type}) => {
    return {
        type: 'new', 
        user_id: state.session.id,
        commentable_id: commentable_id, 
        commentable_type: commentable_type 
    }
}

const mapDispatchToProps = dispatch => ({
    action: comment => dispatch(createComment(comment))
})

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm)