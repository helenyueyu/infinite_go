import React from 'react'; 
import { Link } from 'react-router-dom'; 

class Menu extends React.Component {
    render() {
        const { location: {pathname} } = this.props; 
        return (
            <ul className="menu">
                <li><Link className="menu-item-link" to='/questions'>Home</Link></li>
                <li>PUBLIC</li>
       
                <li>
                    <i className="fa fa-globe" aria-hidden="true"></i>
                    <Link className="menu-item-link" to='/questions'>Infinite Go</Link>
                </li>
                <li><Link className="menu-item-link" to='/users'>Users</Link></li>
                <li><Link className={pathname === "/tags" ? "menu-item-link-active" : "menu-item-link"} to='/tags'>Tags</Link></li>
                <li><Link className={pathname === "/badges" ? "menu-item-link-active" : "menu-item-link"} to='/badges'>Badges</Link></li>

                <li>FIND A JOB</li>
                <li><Link className="menu-item-link" to='/'>Jobs</Link></li>
                <li><Link className="menu-item-link" to='/'>Companies</Link></li>
            </ul>
        )
    }
}

export default Menu; 