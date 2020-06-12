import React from 'react'; 
import { Link } from 'react-router-dom'; 

import SearchContainer from '../../search/search_container'; 

const Navbar = ({currentUser, logout}) => {
    if (currentUser.username !== undefined) {
        return (
            <div className="nav">
                <div className="nav-links">
                    <Link to="/questions" className="nav-link" >InfiniteGO</Link>
                    <Link to="/" className="nav-link">Github</Link>
                    <Link to="/" className="nav-link">LinkedIn</Link>
                </div>
                <SearchContainer />
                <div>
                    <Link to="/profile" className="nav-link">{currentUser.username}</Link>
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