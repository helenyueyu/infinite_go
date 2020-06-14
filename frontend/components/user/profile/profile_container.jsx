import { connect } from 'react-redux';

import Profile from './profile';
import { logout } from '../../../actions/session_actions';
import { fetchUser } from '../../../actions/users_actions';

const mapStateToProps = (state, ownProps) => ({
    currentUser: state.entities.currentUser, 
    users: state.entities.users 
});

const mapDispatchToProps = dispatch => ({
    fetchUser: id => dispatch(fetchUser(id)), 
    logout: user => dispatch(logout(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile); 