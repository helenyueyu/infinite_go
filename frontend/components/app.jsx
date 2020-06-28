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
import EditProfileContainer from './user/profile/edit_profile_container'; 
import BadgesIndexContainer from './badge/badges_index_container'; 
import TagsIndexContainer from './tag/tags_index_container'; 

import NavbarContainer from './user/nav/navbar_container'; 
import ProfileContainer from './user/profile/profile_container'; 

import QuestionsContainer from './question/questions_container'; 
import NewQuestionContainer from './question/new_question_container';
import QuestionContainer from './question/question_container'; 
import EditQuestionContainer from './question/edit_question_container'; 

import EditAnswerContainer from './answer/edit_answer_container';

import TabsSummaryIndexContainer from './user/profile/tabs/tabs_summary_index_container'; 
import TabsAnswersIndexContainer from './user/profile/tabs/tabs_answers_index_container'; 
import TabsQuestionsIndexContainer from './user/profile/tabs/tabs_questions_index_container'; 
import TabsTagsIndexContainer from './user/profile/tabs/tabs_tags_index_container'; 
import TabsBadgesIndexContainer from './user/profile/tabs/tabs_badges_index_container'; 
import TabsBookmarksIndexContainer from './user/profile/tabs/tabs_bookmarks_index_container'; 
import TabsBountiesIndexContainer from './user/profile/tabs/tabs_bounties_index_container'; 
import TabsReputationIndexContainer from './user/profile/tabs/tabs_reptutation_index_container'; 



import JobsContainer from './job/jobs_container'; 

import InfoIndex from './info/info_index'; 
import InfoRightMenu from './info/info_right_menu'; 
import Author from './info/author'; 

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
    createRoute("protected", '/users/:userId/edit', EditProfileContainer, true, Menu, null),
    
    createRoute("normal", '/tags', TagsIndexContainer, true, Menu, null), 
    createRoute("normal", '/info', InfoIndex, true, Menu, InfoRightMenu), 
    createRoute("normal", '/info/badges', BadgesIndexContainer, true, Menu, InfoRightMenu), 
    createRoute("normal", '/info/about', Author, true, Menu, InfoRightMenu), 
    createRoute("auth", '/login', LoginFormContainer, true, null, null), 
    createRoute("auth", '/signup', SignUpFormContainer, true, null, null), 
    createRoute("auth", '/login/demo', DemoContainer, true, null, null), 
    createRoute("normal", '/jobs', JobsContainer, true, Menu, null), 

    createRoute("normal", '/users/:userId/activity/summary', TabsSummaryIndexContainer, true, Menu, null), 
    createRoute("normal", '/users/:userId/activity/answers', TabsAnswersIndexContainer, true, Menu, null), 
    createRoute("normal", '/users/:userId/activity/questions', TabsQuestionsIndexContainer, true, Menu, null), 
    createRoute("normal", '/users/:userId/activity/tags', TabsTagsIndexContainer, true, Menu, null), 
    createRoute("normal", '/users/:userId/activity/badges', TabsBadgesIndexContainer, true, Menu, null), 
    createRoute("normal", '/users/:userId/activity/bookmarks', TabsBookmarksIndexContainer, true, Menu, null), 
    createRoute("normal", '/users/:userId/activity/bounties', TabsBountiesIndexContainer, true, Menu, null), 
    createRoute("normal", '/users/:userId/activity/reputation', TabsReputationIndexContainer, true, Menu, null), 
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