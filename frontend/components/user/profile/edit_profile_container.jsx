import { connect } from 'react-redux';

import EditProfile from './edit_profile';
import { fetchUser } from '../../../actions/users_actions';

const mapStateToProps = (state, ownProps) => ({
    currentUser: state.entities.currentUser, 
    users: state.entities.users 
});

const mapDispatchToProps = dispatch => ({
    fetchUser: id => dispatch(fetchUser(id)) 
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile); 