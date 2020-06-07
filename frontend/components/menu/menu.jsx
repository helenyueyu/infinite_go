import React from 'react'; 
import { Link } from 'react-router-dom'; 

class Menu extends React.Component {
    render() {
        return (
            <div className="menu">
                <span>PUBLIC</span>
                <div className="menu-item">
                    <i class="fa fa-globe" aria-hidden="true"></i>
                    <Link className="menu-item-link" to='/questions'>Infinite Go</Link>
                </div>
                <div className="menu-item">
                    <Link to='/users'>Users</Link>
                </div>
                <div className="menu-item">
                    <Link to='/tags'>Tags</Link>
                </div>

                <span>FIND A JOB</span>
                <div className="menu-item">
                    <Link to='/'>Jobs</Link>
                </div>
                <div className="menu-item">
                    <Link to='/'>Companies</Link>
                </div>
            </div>
        )
    }
}

export default Menu; 