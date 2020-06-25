import { connect } from 'react-redux';
import Comments from './comments';

import { fetchQuestion } from '../../actions/questions_actions'; 
import { deleteComment, fetchComments } from '../../actions/comments_actions'; 

const mapStateToProps = (state) => ({
    comments: state.entities.comments 
})

const mapDispatchToProps = dispatch => ({
    fetchQuestion: id => dispatch(fetchQuestion(id)), 
    fetchComments: questionId => dispatch(fetchComments(questionId)), 
    deleteComment: id => dispatch(deleteComment(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Comments)