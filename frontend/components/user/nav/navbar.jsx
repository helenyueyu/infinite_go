import React from 'react'; 
import { Link, withRouter } from 'react-router-dom'; 

import SearchContainer from '../../search/search_container'; 

class Navbar extends React.Component {
    constructor(props) {
        super(props); 
        this.logout = this.logout.bind(this); 
    }

    logout() {
        this.props.logout().then(() => this.props.history.push('/login')); 
    }

    render() {
        const {currentUser} = this.props; 
        if (currentUser.username !== undefined) {
            return (
                <div className="nav">
                    <div className="nav-links">
                        <div className="nav-link">
                            <Link to="/questions">
                                <i className="fab fa-stack-overflow nav-pic"></i>
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
                        <button className="nav-logout-button" onClick={this.logout}>Logout</button>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="nav">
                    <div className="nav-logo">
                        <i className="fab fa-stack-overflow nav-pic-logged-out"></i>
                    </div>
                    <div>
                        <Link to="/login"><button className="nav-login-button">Log In</button></Link>
                        <Link to="/signup" ><button className="nav-signup-button">Sign Up </button></Link>
                    </div>
                </div>
            )
        }
    }
}

export default withRouter(Navbar); 