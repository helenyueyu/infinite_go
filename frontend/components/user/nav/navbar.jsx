import React from 'react'; 
import { Link } from 'react-router-dom'; 

import SearchContainer from '../../search/search_container'; 

const Navbar = ({currentUser, logout}) => {
    if (currentUser.username !== undefined) {
        return (
            <div className="nav">
                <div>
                    <Link to="/profile" className="nav-username">{currentUser.username}</Link>
                    <Link to="/questions">SO</Link>
                </div>
                <SearchContainer />
                <button className="nav-logout-button" onClick={logout}>Logout</button>
            </div>
        )
    } else {
        return (
            <div className="nav">
                <Link to="/login"><button className="nav-login-button">Log In</button></Link>
                <Link to="/signup" ><button className="nav-signup-button">Sign Up </button></Link>
            </div>
        )
    }
}

export default Navbar; 