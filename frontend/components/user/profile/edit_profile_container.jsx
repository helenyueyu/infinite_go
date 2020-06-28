import { connect } from 'react-redux';

import EditProfile from './edit_profile';
import { fetchUser, updateUser } from '../../../actions/users_actions';

const mapStateToProps = (state, ownProps) => ({
    currentUser: state.entities.currentUser, 
    users: state.entities.users 
});

const mapDispatchToProps = dispatch => ({
    fetchUser: id => dispatch(fetchUser(id)), 
    updateUser: user => dispatch(updateUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile); 