import { connect } from 'react-redux';
import Bookmark from './bookmark';

import { createBookmark } from '../../actions/bookmarks_actions'; 

const mapStateToProps = (state) => ({
    user_id: state.entities.currentUser.id
})

const mapDispatchToProps = (dispatch) => ({
    createBookmark: bookmark => dispatch(createBookmark(bookmark))
})

export default connect(mapStateToProps, mapDispatchToProps)(Bookmark)