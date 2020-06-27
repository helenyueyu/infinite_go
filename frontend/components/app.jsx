import React from 'react'; 

import { Route, Switch } from 'react-router-dom'; 

import { AuthRoute, ProtectedRoute } from '../util/routes_util'

import Footer from '../components/user/footer/footer'; 
import Splash from '../components/user/splash'; 

import Menu from './menu/menu'; 
import RightMenuContainer from './menu/right_menu_container'; 

import SignUpFormContainer from './user/auth/sign_up_form_container';
import LoginFormContainer from './user/auth/login_form_container';
import DemoContainer from './user/auth/demo_container'; 

import ProfileIndexContainer from './user/profile/profile_index_container'; 
import BadgesIndexContainer from './badge/badges_index_container'; 
import TagsIndexContainer from './tag/tags_index_container'; 

import NavbarContainer from './user/nav/navbar_container'; 
import ProfileContainer from './user/profile/profile_container'; 

import QuestionsContainer from './question/questions_container'; 
import NewQuestionContainer from './question/new_question_container';
import QuestionContainer from './question/question_container'; 
import EditQuestionContainer from './question/edit_question_container'; 

import EditAnswerContainer from './answer/edit_answer_container';

import BookmarksIndexContainer from './user/profile/tabs/bookmarks_index_container'; 
import SummaryIndexContainer from './user/profile/tabs/summary_index_container'; 

import JobsContainer from './job/jobs_container'; 

import InfoIndex from './info/info_index'; 
import InfoRightMenu from './info/info_right_menu'; 

import ErrorsPage from './error/errors_page'; 

const createRoute = (status, path, main, exact=true, leftSideBar=Menu, rightSideBar=RightMenuContainer) => {
    return ({ status, path, exact, leftSideBar, main,  rightSideBar })
}

const routes = [
    createRoute("normal", '/', Splash, true, null, null), 
    createRoute("normal", '/questions', QuestionsContainer), 
    createRoute("protected", '/questions/new', NewQuestionContainer, true), 
    createRoute("normal", '/questions/tagged/:tagName', QuestionsContainer), 
    createRoute("normal", '/questions/:questionId/:title', QuestionContainer, true), 
    createRoute("protected", '/questions/:questionId/:title/edit', EditQuestionContainer, true), 
    createRoute("protected", '/questions/:questionId/answers/:answerId/edit', EditAnswerContainer, true), 
    createRoute("normal", '/users', ProfileIndexContainer, true, Menu, null), 
    createRoute("normal", '/users/:userId', ProfileContainer, true, Menu, null), 
    createRoute("normal", '/users/:userId/activity/bookmarks', BookmarksIndexContainer, true, Menu, null), 
    createRoute("normal", '/users/:userId/activity/summary', SummaryIndexContainer, true, Menu, null), 
    createRoute("normal", '/tags', TagsIndexContainer, true, Menu, null), 
    createRoute("normal", '/info', InfoIndex, true, Menu, InfoRightMenu), 
    createRoute("normal", '/info/badges', BadgesIndexContainer, true, Menu, InfoRightMenu), 
    createRoute("auth", '/login', LoginFormContainer, true, null, null), 
    createRoute("auth", '/signup', SignUpFormContainer, true, null, null), 
    createRoute("auth", '/login/demo', DemoContainer, true, null, null), 
    createRoute("normal", '/jobs', JobsContainer, true, Menu, null) 
] 

const App = () => {
    return (
      <>
        <NavbarContainer />

        <div className="app">
          <Switch>
                {routes.map((route, index) => (
                route.status === 'normal' ? 
                <Route key={index} path={route.path} exact={route.exact} component={route.leftSideBar} /> : route.status === 'auth' ? 
                <AuthRoute key={index} path={route.path} exact={route.exact} component={route.leftSideBar} /> : 
                <ProtectedRoute key={index} path={route.path} exact={route.exact} component={route.leftSideBar} />
                ))}
                <Route component={Menu} />

          </Switch>

          <Switch>
                {routes.map((route, index) => {
                    return (
                route.status === 'normal' ? 
                <Route key={index} path={route.path} exact={route.exact} component={route.main} /> : route.status === 'auth' ? 
                <AuthRoute key={index} path={route.path} exact={route.exact} component={route.main} /> : 
                <ProtectedRoute key={index} path={route.path} exact={route.exact} component={route.main} />
                    )
                })}
                <Route component={ErrorsPage} />
          </Switch>
         
          <Switch>
                {routes.map((route, index) => (
                route.status === 'normal' ? 
                <Route key={index} path={route.path} exact={route.exact} component={route.rightSideBar} /> : route.status === 'auth' ? 
                <AuthRoute key={index} path={route.path} exact={route.exact} component={route.rightSideBar} /> : 
                <ProtectedRoute key={index} path={route.path} exact={route.exact} component={route.rightsideBar} />
                ))} 
          </Switch>
        </div>

        <Footer />
      </>
    );
}; 

export default App; 