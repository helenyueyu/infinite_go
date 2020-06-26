import { connect } from 'react-redux';

import SessionForm from './session_form';
import { login } from '../../../actions/session_actions';

const mapStateToProps = () => ({
    user: {
        username: 'helen', 
        email: 'helen@aa.io', 
        password: 'password'
    }
});

const mapDispatchToProps = dispatch => ({
    type: "Demo", 
    action: user => dispatch(login(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm); 