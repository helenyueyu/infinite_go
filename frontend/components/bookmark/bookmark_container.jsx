import { connect } from 'react-redux';
import Bookmark from './bookmark';

import { createBookmark } from '../../actions/bookmarks_actions'; 

const mapStateToProps = (state, { bookmarkable_id, bookmarkable_type }) => ({
    user_id: state.entities.currentUser.id,
    bookmarkable_id: bookmarkable_id,
    bookmarkable_type: bookmarkable_type
})

const mapDispatchToProps = (dispatch) => ({
    createVote: vote => dispatch(createVote(vote))
})

export default connect(mapStateToProps, mapDispatchToProps)(Vote)