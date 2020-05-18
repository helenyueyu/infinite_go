import React from 'react'; 
import { Link } from 'react-router-dom'; 

class Menu extends React.Component {
    render() {
        return (
            <div className="menu">
                Menu
                <Link to='/users'>Users</Link>
                <Link to='/tags'>Tags</Link>
            </div>
        )
    }
}

export default Menu; 