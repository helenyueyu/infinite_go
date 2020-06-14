import { connect } from 'react-redux';

import ProfileIndex from './profile_index';
import { fetchUsers, searchUsers } from '../../../actions/users_actions'; 

const mapStateToProps = (state) => ({
    users: Object.values(state.entities.users) 
});

const mapDispatchToProps = dispatch => ({
    fetchUsers: () => dispatch(fetchUsers()), 
    searchUsers: query => dispatch(searchUsers(query))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileIndex); 