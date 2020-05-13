import { connect } from 'react-redux';

import SessionForm from './session_form';
import { signup } from '../../../actions/session_actions';

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    type: "Sign Up", 
    action: user => dispatch(signup(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm); 