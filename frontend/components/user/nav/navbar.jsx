import React from 'react'; 
import { Link } from 'react-router-dom'; 

import SearchContainer from '../../search/search_container'; 

const Navbar = ({currentUser, logout}) => {
    if (currentUser.username !== undefined) {
        return (
            <div className="nav">
                <div className="nav-links">
                    <Link to="/questions" className="nav-link" >InfiniteGO</Link>
                    <a href="https://github.com/helenyueyu/" className="nav-link">Github</a>
                    <a href="https://www.linkedin.com/in/helen-yu-08b57953/" className="nav-link">LinkedIn</a>
                </div>
                <SearchContainer />
                <div>
                    <Link to={`/users/${currentUser.id}`} className="nav-link">{currentUser.username}</Link>
                    <button className="nav-logout-button" onClick={logout}>Logout</button>
                </div>
                
            </div>
        )
    } else {
        return (
            <div className="nav">
                <div className="nav-logo">IG</div>
                <div>
                    <Link to="/login"><button className="nav-login-button">Log In</button></Link>
                    <Link to="/signup" ><button className="nav-signup-button">Sign Up </button></Link>
                </div>
            </div>
        )
    }
}

export default Navbar; 