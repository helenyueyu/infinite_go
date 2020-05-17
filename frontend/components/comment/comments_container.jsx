import { connect } from 'react-redux';
import Comments from './comments';

import { createComment } from '../../actions/comments_actions';

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = dispatch => ({
    // createComment: comment => dispatch(createComment(comment))
})

export default connect(mapStateToProps, mapDispatchToProps)(Comments)