import React from 'react'; 

import { Route, Switch } from 'react-router-dom'; 

import { AuthRoute, ProtectedRoute } from '../util/route_util'

import SignUpFormContainer from './user/auth/sign_up_form_container';
import LoginFormContainer from './user/auth/login_form_container';

import NavbarContainer from './user/nav/navbar_container'; 
import ProfileContainer from './user/profile/profile_container'; 

import QuestionsContainer from './question/questions_container'; 
import NewQuestionContainer from './question/new_question_container'; 

const App = () => (
    <>
        <NavbarContainer />
        <Switch>
            <AuthRoute exact path="/signup" component={SignUpFormContainer} />
            <AuthRoute exact path="/login" component={LoginFormContainer} />

            <Route exact path="/questions" component={QuestionsContainer} />
            <ProtectedRoute exact path="/questions/new" component={NewQuestionContainer} />

            <ProtectedRoute exact path="/profile" component={ProfileContainer} />
        </Switch>
    </>
); 

export default App; 