import React from 'react'; 
import { Link } from 'react-router-dom'; 

import SearchContainer from '../../search/search_container'; 

const Navbar = ({currentUser, logout}) => {
    if (currentUser.username !== undefined) {
        return (
            <div className="nav">
                <div className="nav-links">
                    <div className="nav-link">
                        <Link to="/questions">
                            <img className="nav-pic" src="/assets/bug_mojo.png" />
                        </Link>
                    </div>
                    <div className="nav-link">
                        <a href="https://github.com/helenyueyu/">
                            <i className="fab fa-github-square"></i>
                        </a>
                    </div>
                    <div className="nav-link">
                        <a href="https://www.linkedin.com/in/helen-yu-08b57953/">
                            <i className="fab fa-linkedin"></i>
                        </a>
                    </div>
                    <div className="nav-link">
                        <a href="https://angel.co/u/helen-yu-2">
                            <i className="fab fa-angellist"></i>
                        </a>
                    </div>

                    
                </div>
                <SearchContainer />
                <div className="nav-links">
                    <Link to={`/users/${currentUser.id}`} className="nav-link-username">                        
                        {currentUser.username}
                    </Link>
                    <div className="nav-link">
                        <Link to="/badges">
                            <i className="fas fa-question-circle"></i>
                        </Link>
                    </div>
                    <button className="nav-logout-button" onClick={logout}>Logout</button>
                </div>
            </div>
        )
    } else {
        return (
            <div className="nav">
                <div className="nav-logo">
                    <img className="nav-pic" src="/assets/bug_mojo.png" />
                </div>
                <div>
                    <Link to="/login"><button className="nav-login-button">Log In</button></Link>
                    <Link to="/signup" ><button className="nav-signup-button">Sign Up </button></Link>
                </div>
            </div>
        )
    }
}

export default Navbar; 