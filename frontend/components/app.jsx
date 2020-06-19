import React from 'react'; 

import { Route, Switch } from 'react-router-dom'; 

import { AuthRoute, ProtectedRoute } from '../util/routes_util'

import Footer from '../components/user/footer/footer'; 
import Splash from '../components/user/splash'; 

import Menu from './menu/menu'; 
import RightMenuContainer from './menu/right_menu_container'; 
import RightMenu from './menu/right_menu'; 

import SignUpFormContainer from './user/auth/sign_up_form_container';
import LoginFormContainer from './user/auth/login_form_container';

import ProfileIndexContainer from './user/profile/profile_index_container'; 
import BadgesIndexContainer from './badge/badges_index_container'; 
import TagsIndexContainer from './tag/tags_index_container'; 

import NavbarContainer from './user/nav/navbar_container'; 
import ProfileContainer from './user/profile/profile_container'; 
import ProfileActivityContainer from './user/profile/profile_activity_container'; 

import QuestionsContainer from './question/questions_container'; 
import NewQuestionContainer from './question/new_question_container';
import QuestionContainer from './question/question_container'; 
import EditQuestionContainer from './question/edit_question_container'; 

import EditAnswerContainer from './answer/edit_answer_container';

const createRoute = (path, main, exact=true, leftSideBar=Menu, rightSideBar=RightMenuContainer) => {
    return ({ path, exact, leftSideBar, main,  rightSideBar })
}
const routes = [
    createRoute('/', Splash, true, null, null), 
    createRoute('/questions', QuestionsContainer), 
    createRoute('/questions/:questionId', QuestionContainer), 
    createRoute('/questions/:questionId/edit', EditQuestionContainer), 
    createRoute('/questions/new', NewQuestionContainer), 
    createRoute('/questions/:questionId/answers/:answerId/edit', EditAnswerContainer), 
    createRoute('/users', ProfileIndexContainer, true, Menu, null), 
    createRoute('/users/:userId', ProfileContainer, true, Menu, null), 
    createRoute('/users/:userId/activity', ProfileActivityContainer, true, Menu, null)
] 

const App = () => {
    return (
      <>
        <NavbarContainer />

        <div className="app">
          {routes.map((route, index) => (
            <Route key={index} path={route.path} exact={route.exact} component={route.leftSideBar} />
          ))}
          <div className="app-middle">
            {routes.map((route, index) => (
              <Route key={index} path={route.path} exact={route.exact} component={route.main} />
            ))}
          </div>

          {routes.map((route, index) => (
            <Route key={index} path={route.path} exact={route.exact} component={route.rightSideBar} />
          ))}
          {/* <Switch>
                    <ProtectedRoute path="/questions" component={Menu} />
                    <ProtectedRoute path="/badges" component={Menu} />
                    <ProtectedRoute path="/tags" component={Menu} />
                    <ProtectedRoute path="/users" component={Menu} />
                    <ProtectedRoute path="/badges" component={Menu} />
                </Switch>

                <div className="app-middle">
                    <Switch>
                        <AuthRoute exact path="/signup" component={SignUpFormContainer} />
                        <AuthRoute exact path="/login" component={LoginFormContainer} />

                        <Route exact path="/" component={Splash} />

                        <Route exact path="/users" component={ProfileIndexContainer} />
                        <Route exact path="/tags" component={TagsIndexContainer} />
                        <Route exact path="/badges" component={BadgesIndexContainer} />

                        <Route exact path="/questions" components={QuestionsContainer} />
                        <Route exact path="/questions/tagged/:tagName" component={QuestionsContainer} />

                        <Route exact path="/questions/?q=:query" component={QuestionsContainer} />

                        <ProtectedRoute exact path="/questions/new" component={NewQuestionContainer} />
                        <ProtectedRoute exact path="/questions/:questionId/edit" component={EditQuestionContainer} />
                        <Route exact path="/questions/:questionId" component={QuestionContainer} />

                        <ProtectedRoute exact path="/questions/:questionId/answers/:answerId/edit" component={EditAnswerContainer} />

                        <Route exact path="/users/:userId" component={ProfileContainer} />
                        <Route exact path="/users/:userId/activity" component={ProfileActivityContainer} />
                    </Switch>
                </div>

                <Switch> 
                    <Route exact path="/questions" component={RightMenuContainer} />
                    <Route exact path="/questions/tagged/:tagName" component={RightMenuContainer} />
                    <Route exact path="/questions/:questionId" component={RightMenuContainer} />
                </Switch> */}
        </div>

        <Footer />
      </>
    );
}; 

export default App; 