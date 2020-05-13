import { connect } from 'react-redux';

import Profile from './profile';
import { logout } from '../../../actions/session_actions';

const mapStateToProps = (state) => ({});

const mapDispatchToProps = dispatch => ({
    logout: user => dispatch(logout(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile); 