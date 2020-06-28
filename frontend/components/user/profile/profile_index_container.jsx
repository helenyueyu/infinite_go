import { connect } from 'react-redux';

import ProfileIndex from './profile_index';
import { fetchUsers, searchUsers } from '../../../actions/users_actions'; 
import { fetchPaginatedUsers } from '../../../actions/users_actions'; 
import { changeUserPageNumber, changeUserFilter } from '../../../actions/user_search_actions';
import { fetchStats } from '../../../actions/metas_actions'; 

const mapStateToProps = (state) => ({
    users: Object.values(state.entities.users), 
    search: state.entities.search.user,
    userCount: state.entities.metas.stats.userCount 
});

const mapDispatchToProps = dispatch => ({
    fetchUsers: () => dispatch(fetchUsers()), 
    searchUsers: query => dispatch(searchUsers(query)), 
    fetchPaginatedUsers: (pageNumber, pageLimit, filter) => dispatch(fetchPaginatedUsers(pageNumber, pageLimit, filter)),
    changeUserPageNumber: pageNumber => dispatch(changeUserPageNumber(pageNumber)), 
    changeUserFilter: filter => dispatch(changeUserFilter(filter)), 
    fetchStats: () => dispatch(fetchStats()), 
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileIndex); 