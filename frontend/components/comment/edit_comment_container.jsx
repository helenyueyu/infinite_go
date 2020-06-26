import { connect } from 'react-redux';
import CommentForm from './comment_form';

import { fetchQuestion } from '../../actions/questions_actions'; 
import { updateComment } from '../../actions/comments_actions';

const mapStateToProps = (state, {commentable_id, commentable_type}) => {
    // debugger; 
    return {
        type: 'edit', 
        user_id: state.session.id,
        commentable_id: commentable_id, 
        commentable_type: commentable_type 
    }
}

const mapDispatchToProps = dispatch => ({
    action: comment => dispatch(updateComment(comment)), 
    fetchQuestion: id => dispatch(fetchQuestion(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm)