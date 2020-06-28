import { connect } from 'react-redux';

import TabsBookmarksIndex from './tabs_bookmarks_index'; 
import { fetchBookmarks } from '../../../../actions/bookmarks_actions'; 

const mapStateToProps = (state, ownProps) => ({
    bookmarks: Object.values(state.entities.bookmarks)
});

const mapDispatchToProps = dispatch => ({
    fetchBookmarks: () => dispatch(fetchBookmarks()),
});


export default connect(mapStateToProps, mapDispatchToProps)(TabsBookmarksIndex); 