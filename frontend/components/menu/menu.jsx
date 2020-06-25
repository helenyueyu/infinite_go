import React from 'react'; 
import { Link } from 'react-router-dom'; 

class Menu extends React.Component {
    render() {
        const { location: {pathname} } = this.props; 

        return (
            <ul className="menu">
                <li className={pathname === "/" ? "menu-item-link-active" : "menu-item-link"}>
                    <Link className="menu-item-link" to='/'>Home</Link>
                </li>
                <li className="menu-public">PUBLIC</li>
       
                <li className={pathname === "/questions" ? "menu-item-link-active" : "menu-item-link"}>
                    <i className={pathname.startsWith("/questions") ? "fas fa-globe-americas active" : "fas fa-globe-americas"}></i> 
                    <Link className="menu-item-link" to='/questions'>Infinite Go</Link>
                </li>
                <li className={pathname === "/users" ? "menu-item-link-active" : "menu-item-link"}>
                    <Link className="menu-item-link types" to='/users'>Users</Link>
                </li>
                <li className={pathname === "/tags" ? "menu-item-link-active" : "menu-item-link"}>
                    <Link className="menu-item-link types" to='/tags'>Tags</Link>
                </li>
                <li className={pathname === "/jobs" ? "menu-item-link-active" : "menu-item-link"}>
                    <Link className="menu-item-link types" to='/jobs'>Jobs</Link>
                </li>
            </ul>
        )
    }
}

export default Menu; 