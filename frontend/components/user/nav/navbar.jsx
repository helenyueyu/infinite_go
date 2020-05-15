import React from 'react'; 
import { Link } from 'react-router-dom'; 

const Navbar = ({currentUser, logout}) => {
    if (currentUser.username !== undefined) {
        return (
            <>
                <h1><Link to="/profile">{currentUser.username}</Link></h1>
                <button onClick={logout}>Logout</button>
            </>
        )
    } else {
        return (
            <>
                <Link to="/login"><button>Log In</button></Link>
                <Link to="/signup" ><button>Sign Up </button></Link>
            </>
        )
    }
}

export default Navbar; 