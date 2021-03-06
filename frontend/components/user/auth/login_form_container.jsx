import { connect } from 'react-redux';

import SessionForm from './session_form';
import { login } from '../../../actions/session_actions';

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
    type: "Log In", 
    action: user => dispatch(login(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm); 