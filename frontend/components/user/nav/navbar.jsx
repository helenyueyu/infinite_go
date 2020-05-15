import React from 'react'; 
import { Link } from 'react-router-dom'; 

const Navbar = ({currentUser, logout}) => {
    if (currentUser.username !== undefined) {
        return (
            <div className="nav">
                <h1><Link to="/profile">{currentUser.username}</Link></h1>
                <button onClick={logout}>Logout</button>
            </div>
        )
    } else {
        return (
            <div className="nav">
                <Link to="/login"><button>Log In</button></Link>
                <Link to="/signup" ><button>Sign Up </button></Link>
            </div>
        )
    }
}

export default Navbar; 