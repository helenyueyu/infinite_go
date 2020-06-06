import React from 'react'; 

import { Route, Switch } from 'react-router-dom'; 

import { AuthRoute, ProtectedRoute } from '../util/routes_util'

import Footer from '../components/user/footer/footer'; 
import Splash from '../components/user/splash'; 

import Menu from './menu/menu'; 
import RightMenu from './menu/right_menu'; 

import SignUpFormContainer from './user/auth/sign_up_form_container';
import LoginFormContainer from './user/auth/login_form_container';

import ProfileIndexContainer from './user/profile/profile_index_container'; 
import TagIndexContainer from './tag/tag_index_container'; 

import NavbarContainer from './user/nav/navbar_container'; 
import ProfileContainer from './user/profile/profile_container'; 

import QuestionsContainer from './question/questions_container'; 
import NewQuestionContainer from './question/new_question_container';
import QuestionContainer from './question/question_container'; 
import EditQuestionContainer from './question/edit_question_container'; 

import EditAnswerContainer from './answer/edit_answer_container';

const App = () => (
    <>
        <NavbarContainer />
        
        <div className="app">
            <ProtectedRoute path="/questions" component={Menu} />
            <div className="app-middle">
                <Switch>
                    <AuthRoute exact path="/signup" component={SignUpFormContainer} />
                    <AuthRoute exact path="/login" component={LoginFormContainer} />

                    <Route exact path="/" component={Splash} />

                    <Route exact path="/users" component={ProfileIndexContainer} />
                    <Route exact path="/tags" component={TagIndexContainer} />

                    <Route exact path="/questions" component={QuestionsContainer} />
                    <Route exact path="/questions/?q=:query" component={QuestionsContainer} />

                    <ProtectedRoute exact path="/questions/new" component={NewQuestionContainer} />
                    <ProtectedRoute exact path="/questions/:questionId/edit" component={EditQuestionContainer} />
                    <Route exact path="/questions/:questionId" component={QuestionContainer} />

                    <ProtectedRoute exact path="/questions/:questionId/answers/:answerId/edit" component={EditAnswerContainer} />

                    <ProtectedRoute exact path="/profile" component={ProfileContainer} />
                </Switch>
            </div>
            <ProtectedRoute path="/questions" component={RightMenu} />
        </div>

        <Footer />
    </>
); 

export default App; 