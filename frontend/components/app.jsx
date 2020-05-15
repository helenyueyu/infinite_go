import React from 'react'; 

import { Route, Switch } from 'react-router-dom'; 

import { AuthRoute, ProtectedRoute } from '../util/routes_util'

import Menu from './menu/menu'; 
import RightMenu from './menu/right_menu'; 


import SignUpFormContainer from './user/auth/sign_up_form_container';
import LoginFormContainer from './user/auth/login_form_container';

import NavbarContainer from './user/nav/navbar_container'; 
import ProfileContainer from './user/profile/profile_container'; 

import QuestionsContainer from './question/questions_container'; 
import NewQuestionContainer from './question/new_question_container';
import QuestionContainer from './question/question_container'; 
import EditQuestionContainer from './question/edit_question_container'; 
 
const App = () => (
    <>
        <NavbarContainer />
        
        <div className="app">
            <Menu />
            <div className="app-middle">
                <Switch>
                    <AuthRoute exact path="/signup" component={SignUpFormContainer} />
                    <AuthRoute exact path="/login" component={LoginFormContainer} />

                    <Route exact path="/questions" component={QuestionsContainer} />
                    <Route exact path="/questions/?q=:query" component={QuestionsContainer} />

                    <ProtectedRoute exact path="/questions/new" component={NewQuestionContainer} />
                    <ProtectedRoute exact path="/questions/:questionId/edit" component={EditQuestionContainer} />
                    <Route exact path="/questions/:questionId" component={QuestionContainer} />

                    <ProtectedRoute exact path="/profile" component={ProfileContainer} />
                </Switch>
            </div>
            <RightMenu />
        </div>
    </>
); 

export default App; 