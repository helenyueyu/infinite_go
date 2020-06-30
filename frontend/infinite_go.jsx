import React from 'react';
import ReactDOM from 'react-dom';

import "core-js/stable";
import "regenerator-runtime/runtime";

import configureStore from './store/store';
import Root from './components/root';

import { logout } from './actions/session_actions';


document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('root');

    let store;
    if (window.currentUser) {
        const preloadedState = {
            entities: {
                currentUser: window.currentUser 
            },
            session: { id: window.currentUser.id }
        }
        store = configureStore(preloadedState);
        delete window.currentUser;
    } else {
        store = configureStore();
    }

    window.store = store; 
    window.dispatch = store.dispatch; 
    
    window.logout = logout; 

    ReactDOM.render(<Root store={store}/>, root);
})