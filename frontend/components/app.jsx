import React from 'react'; 

import { Route, Switch } from 'react-router-dom'; 

import { AuthRoute, ProtectedRoute } from '../util/route_util'

import SignUpFormContainer from './user/sign_up_form_container';
import LoginFormContainer from './user/login_form_container';
import ProfileContainer from './user/profile_container'; 


const App = () => (
    <Switch>
        <AuthRoute exact path="/signup" component={SignUpFormContainer} />
        <AuthRoute exact path="/login" component={LoginFormContainer} />
        <ProtectedRoute exact path="/profile" component={ProfileContainer} />
    </Switch>
); 

export default App; 