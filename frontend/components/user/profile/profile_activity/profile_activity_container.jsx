import { connect } from 'react-redux';

import ProfileActivity from './profile_activity'; 
import { fetchUser } from '../../../../actions/users_actions';

const mapStateToProps = (state, ownProps) => ({
    users: state.entities.users
});

const mapDispatchToProps = dispatch => ({
    fetchUser: id => dispatch(fetchUser(id)),
});


export default connect(mapStateToProps, mapDispatchToProps)(ProfileActivity); 