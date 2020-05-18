import { connect } from 'react-redux';
import Comments from './comments';

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = dispatch => ({
    // createComment: comment => dispatch(createComment(comment))
})

export default connect(mapStateToProps, mapDispatchToProps)(Comments)